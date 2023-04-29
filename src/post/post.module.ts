import { Module, forwardRef } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './models/post.model';
import { UserModule } from '../user/user.module';
import { User } from '../user/models/user.model';
import { PostRate } from '../post-rate/models/post-rate.model';

@Module({
  imports:[SequelizeModule.forFeature([Post, User, PostRate]),
  forwardRef(() => UserModule)
  ],
  controllers: [PostController],
  providers: [PostService],
  exports:[PostService]
})
export class PostModule {}
