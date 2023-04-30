import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Media } from './models/media.model';
import { Post } from '../post/models/post.model';
import { FilesModule } from '../files/files.module';
import { PostModule } from '../post/post.module';

@Module({
  imports: [SequelizeModule.forFeature([Media, Post]), FilesModule, PostModule],
  controllers: [MediaController],
  providers: [MediaService]
})
export class MediaModule {}
