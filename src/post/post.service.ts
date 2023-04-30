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

  findAll(page: number =1 , limit: number = 2) {
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

    if(!post){
      throw new HttpException('post with this id not found', HttpStatus.NOT_FOUND)
    }
    return post
  }

  async update(id: number, updatePostDto: UpdatePostDto) {

    const updatedPost = await this.postRepo.update(updatePostDto, {where:{id}, returning: true});
    let rate = await this.postRepo.findAll({where:{user_id: updatedPost[1][0].user_id}, attributes:[[ Sequelize.fn('AVG', Sequelize.col('average_rating')), 'user_rate']]});

    let user_rate = +rate[0].dataValues["user_rate"]
    if(user_rate === 0){
      user_rate = null
    }
    
    let updatedRating = await this.userService.update(updatedPost[1][0].user_id, {user_rate});
    return updatedPost;
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
