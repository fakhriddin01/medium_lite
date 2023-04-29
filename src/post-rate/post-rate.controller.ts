import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostRateService } from './post-rate.service';
import { CreatePostRateDto } from './dto/create-post-rate.dto';
import { UpdatePostRateDto } from './dto/update-post-rate.dto';

@Controller('post-rate')
export class PostRateController {
  constructor(private readonly postRateService: PostRateService) {}

  @Post()
  create(@Body() createPostRateDto: CreatePostRateDto) {
    return this.postRateService.create(createPostRateDto);
  }

  @Get()
  findAll() {
    return this.postRateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postRateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostRateDto: UpdatePostRateDto) {
    return this.postRateService.update(+id, updatePostRateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postRateService.remove(+id);
  }
}
