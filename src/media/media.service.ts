import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Media } from './models/media.model';
import { FilesService } from '../files/files.service';
import { PostService } from '../post/post.service';

@Injectable()
export class MediaService {
  
  constructor(
    @InjectModel(Media) private mediaRepo: typeof Media,
    private readonly fileService: FilesService,
    private readonly postService: PostService
  ){}

  async create(createMediaDto: CreateMediaDto, file: Express.Multer.File) {

    const post = await this.postService.findOne(createMediaDto.post_id);
    const media = await this.fileService.createFile(file);
    const newMedia = await this.mediaRepo.create({...createMediaDto, media});
    return newMedia;
  }

  findAll() {
    return this.mediaRepo.findAll({include: {all:true}});
  }

  findOne(id: number) {
    return this.mediaRepo.findByPk(id, {include: {all: true}});
  }

  update(id: number, updateMediaDto: UpdateMediaDto) {
    return this.mediaRepo.update(updateMediaDto, {where: {id}, returning: true});
  }

  remove(id: number) {
    return this.mediaRepo.destroy({where: {id}});
  }
}
