import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './models/post.model';
import { UserService } from '../user/user.service';
import { PostRate } from '../post-rate/models/post-rate.model';
import { Sequelize } from 'sequelize';

@Injectable()
export class PostService {

  constructor(
    @InjectModel(Post) private postRepo: typeof Post,
    private userService: UserService
  ){}

  async create(createPostDto: CreatePostDto) {

    const user = await this.userService.findOne(createPostDto.user_id);
    if(!user){
      throw new HttpException('User with this id not found', HttpStatus.NOT_FOUND)
    }

    const read_time = this.read_time_calculation(createPostDto.content);

    const newPost = await this.postRepo.create({...createPostDto, read_time});

    return newPost;

  }

  findAll(page: number =1 , limit: number = 5) {
    let offset = limit*(page-1)
    return this.postRepo.findAll({offset, limit, include:{all:true}});
  }


  async findUserPosts(user_id: number, page: number =1 , limit: number = 5) {
    
    const user = await this.userService.findOne(user_id);
    if(!user){
      throw new HttpException('User with this id not found', HttpStatus.NOT_FOUND)
    }
    let offset = limit*(page-1)
    return this.postRepo.findAll({where: {user_id}, offset, limit, include:{all:true}});
  }

  async findOne(id: number) {

    const post = await this.postRepo.findByPk(id, {include: {all:true}});
    // const post = await this.postRepo.findByPk(id,  {
    //   include: {
    //     model: PostRate,
    //     as: 'ratings',
    //     attributes: [[Sequelize.fn('AVG', Sequelize.col('rate')), 'rating']],
    //   },
    //   group: ['post_id']
    // });

    if(!post){
      throw new HttpException('post with this id not found', HttpStatus.NOT_FOUND)
    }
    return post
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.postRepo.update(updatePostDto, {where:{id}, returning: true});
  }

  remove(id: number) {
    return this.postRepo.destroy({where: {id}});
  }


  private read_time_calculation(content: string): number{
    let words: Array<string | number> = content.split('');
    const words_per_minut = 250;
    let read_time = Math.ceil(words.length/words_per_minut);
    return read_time;
  }
}
