import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { PostRateService } from './post-rate.service';
import { CreatePostRateDto } from './dto/create-post-rate.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('"Post-Rate" controllers')
@Controller('post-rate')
export class PostRateController {
  constructor(private readonly postRateService: PostRateService) {}

  @ApiOperation({summary: 'Craete or Update the rate for the post'})
  @Post()
  create(@Body() createPostRateDto: CreatePostRateDto) {
    return this.postRateService.create(createPostRateDto);
  }

  @ApiOperation({summary: 'Get all rates'})
  @Get()
  findAll() {
    return this.postRateService.findAll();
  }

  @ApiOperation({summary: 'Get one rate by id'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postRateService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePostRateDto: UpdatePostRateDto) {
  //   return this.postRateService.update(+id, updatePostRateDto);
  // }

  @ApiOperation({summary: 'Delete one rate by id'})
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.postRateService.remove(+id);
  }
}
