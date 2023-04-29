import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostRateDto } from './dto/create-post-rate.dto';
import { UpdatePostRateDto } from './dto/update-post-rate.dto';
import { InjectModel } from '@nestjs/sequelize';
import { PostRate } from './models/post-rate.model';
import { UserService } from '../user/user.service';

@Injectable()
export class PostRateService {

  constructor(
    @InjectModel(PostRate) private rateRepo: typeof PostRate,
    private readonly userService: UserService
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
      return updatedRating[1][0];
    }

    let newRating = await this.rateRepo.create(createPostRateDto);
    return newRating;
  }

  findAll() {
    return this.rateRepo.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} postRate`;
  }

  update(id: number, updatePostRateDto: UpdatePostRateDto) {
    return `This action updates a #${id} postRate`;
  }

  remove(id: number) {
    return `This action removes a #${id} postRate`;
  }
}
