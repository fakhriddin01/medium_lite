import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';
@ApiTags('"User" controllers')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({summary: 'User registration'})
  @Post('registration')
  @UseInterceptors(FileInterceptor('file'))
  registration(@Body() createUserDto: CreateUserDto, @UploadedFile() file?: Express.Multer.File) {
    return this.userService.registration(createUserDto, file);
  }

  @ApiOperation({summary: 'User login'})
  @Post('login')
  @HttpCode(200)
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }


  @ApiQuery({name: 'page', required:false})
  @ApiQuery({name: 'limit', required:false})
  @ApiOperation({summary: 'Get all users, pagination: (defaul: page=1?limit=2)'})
  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number ) {
    return this.userService.findAll(page, limit);
  }

  @ApiOperation({summary: 'Get one user by id'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOperation({summary: 'Update username'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({summary: 'Delete user by id'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
