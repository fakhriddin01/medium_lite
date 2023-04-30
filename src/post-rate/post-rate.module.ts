import { Module } from '@nestjs/common';
import { PostRateService } from './post-rate.service';
import { PostRateController } from './post-rate.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/models/user.model';
import { Post } from '../post/models/post.model';
import { PostRate } from './models/post-rate.model';
import { UserModule } from '../user/user.module';
import { PostModule } from '../post/post.module';

@Module({
  imports:[SequelizeModule.forFeature([PostRate, User, Post]), UserModule, PostModule],
  controllers: [PostRateController],
  providers: [PostRateService],
})
export class PostRateModule {}
