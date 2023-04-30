import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostRateDto } from './dto/create-post-rate.dto';
import { UpdatePostRateDto } from './dto/update-post-rate.dto';
import { InjectModel } from '@nestjs/sequelize';
import { PostRate } from './models/post-rate.model';
import { UserService } from '../user/user.service';
import { PostService } from '../post/post.service';
import { Sequelize } from 'sequelize';

@Injectable()
export class PostRateService {

  constructor(
    @InjectModel(PostRate) private rateRepo: typeof PostRate,
    private readonly userService: UserService,
    private readonly postService: PostService,
    ){}

  async create(createPostRateDto: CreatePostRateDto) {

    let {user_id, post_id, rate} = createPostRateDto

    let voterUser = await this.userService.findOne(user_id);

    if(!voterUser){
      throw new HttpException('user ID not found', HttpStatus.NOT_FOUND);
    }

    let foundRating = await this.rateRepo.findOne({where: {post_id, user_id}, include: {all: true}});
    
    if(foundRating){
      let updatedRating = await this.rateRepo.update({rate}, {where:{id: foundRating.id}, returning: true});
      let average_rating = await this.rateRepo.findAll({where:{post_id}, attributes:[[ Sequelize.fn('AVG', Sequelize.col('rate')), 'average_rate']]});
      const updatedPost = await this.postService.update(post_id, {average_rating: +average_rating[0].dataValues["average_rate"]})
      return {rate: updatedRating[1][0], post: updatedPost[1][0]};
    }

    let newRating = await this.rateRepo.create(createPostRateDto);
    
    let average_rating = await this.rateRepo.findAll({where:{post_id}, attributes:[[ Sequelize.fn('AVG', Sequelize.col('rate')), 'average_rate']]});
    const updatedPost = await this.postService.update(post_id, {average_rating: +average_rating[0].dataValues["average_rate"]})
    
    return {rate: newRating, post: updatedPost[1][0]};
  }

  findAll() {
    return this.rateRepo.findAll();
  }

  findOne(id: number) {
    return this.rateRepo.findByPk(id, {include: {all:true}});
  }

  update(id: number, updatePostRateDto: UpdatePostRateDto) {
    return `This action updates a #${id} postRate`;
  }

  async remove(id: number) {
    let rate = await this.findOne(id);
    await this.rateRepo.destroy({where: {id}});
    let average = await this.rateRepo.findAll({where:{post_id:rate.post_id}, attributes:[[ Sequelize.fn('AVG', Sequelize.col('rate')), 'average_rate']]});
    let average_rating = +average[0].dataValues["average_rate"];
    if(average_rating === 0){
      average_rating = null
    }
    const updatedPost = await this.postService.update(rate.post_id, {average_rating})
    return updatedPost[1][0]
  }
}
