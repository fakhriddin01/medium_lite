import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from '../files/files.module';
import { PostModule } from '../post/post.module';
import { Post } from '../post/models/post.model';
import { PostRate } from '../post-rate/models/post-rate.model';

@Module({
  imports:[SequelizeModule.forFeature([User, Post, PostRate]),
    JwtModule.register({
      
    }),
    FilesModule,

  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
