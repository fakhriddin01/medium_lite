import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, HttpCode } from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';

@ApiTags('"Media" controllers')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  // @ApiOperation({summary: 'Create Media for post'})
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        post_id: { type: 'integer' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createMediaDto: CreateMediaDto, @UploadedFile() file: Express.Multer.File) {
    return this.mediaService.create(createMediaDto, file);
  }
  
  @ApiOperation({summary: 'Get all Media'})
  @Get()
  findAll() {
    return this.mediaService.findAll();
  }

  @ApiOperation({summary: 'Get one Media by id'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediaService.findOne(+id);
  }

  @ApiOperation({summary: 'update Media'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
    return this.mediaService.update(+id, updateMediaDto);
  }

  @ApiOperation({summary: 'Delete one Media by id'})
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.mediaService.remove(+id);
  }
}
