import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
@ApiTags('"Post" controllers')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({summary: 'Create new post'})
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @ApiQuery({name: 'page', required:false})
  @ApiQuery({name: 'limit', required:false})
  @ApiOperation({summary: 'Get all posts, pagination default(page=1&limit=2)'})
  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number ) {
    return this.postService.findAll(page, limit);
  }

  @ApiOperation({summary: 'Get one post by id'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @ApiQuery({name: 'page', required:false})
  @ApiQuery({name: 'limit', required:false})
  @ApiOperation({summary: 'Get users all posts by user id, pagination default(page=1&limit=5)'})
  @Get('/user/:user_id')
  findUserPosts(@Param('user_id') user_id: string, @Query('page') page: number, @Query('limit') limit: number) {
    return this.postService.findUserPosts(+user_id, page, limit);
  }

  @ApiOperation({summary: 'update post id'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @ApiOperation({summary: 'Delete post by id'})
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
