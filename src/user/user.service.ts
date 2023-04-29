import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'
import { LoginUserDto } from './dto/login-user.dto';
import { FilesService } from '../files/files.service';
import { PostService } from '../post/post.service';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User) private userRepo: typeof User,
    private readonly fileService: FilesService,
    private readonly jwtService: JwtService,
  ){}

  async registration(createUserDto: CreateUserDto, file?: Express.Multer.File) {
    const user = await this.findOneByEmail(createUserDto.email)    
    
    if(user) {
      throw new BadRequestException('email already used!');
      
    }
    
    if(createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException('Password is not match!');
    }
    let fileName = null;
    if(file){
      fileName = await this.fileService.createFile(file);
    }

    const hashed_password = await bcrypt.hash(createUserDto.password,7);
    const newUser = await this.userRepo.create({
      ...createUserDto,
      hashed_password: hashed_password,
      image: fileName
    })

    const tokens = await this.generateToken(newUser)

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token,7)

    const updateUser = await this.userRepo.update({
      hashed_refresh_token: hashed_refresh_token,
    }, {where:{id: newUser.id}, returning: true});


    return {username: newUser.username, tokens}; 

  }

  async login(loginUserDto: LoginUserDto){
    const {email, password} = loginUserDto;
    
    const user = await this.userRepo.findOne({where:{email}, include: {all: true}});
    if(!user) {
      throw new HttpException('user not found!!', HttpStatus.NOT_FOUND)

    }

    const isMatchPass = await bcrypt.compare(password, user.hashed_password)
    if(!isMatchPass) {
      throw new BadRequestException('email or password not correct!!!');
    }

    const tokens = await this.generateToken(user)

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token,7)

    const updatedUser = await this.userRepo.update({
      hashed_refresh_token: hashed_refresh_token},
     {where: {id: user.id}, returning: true}
    )

    return { username: user.username, tokens};
  }
  
  findAll(page: number = 1, limit: number = 2) {
    let offset = limit*(page-1)
    return this.userRepo.findAll({offset, limit, include:{all:true}});
  }

  findOneByEmail(email: string) {
    const foundUser = this.userRepo.findOne({where:{email}, include: {all:true}});
    if(!foundUser){
      throw new HttpException('User with this email not found', HttpStatus.NOT_FOUND)
    }
    return foundUser;
  }

  findOne(id: number) {

    const foundUser = this.userRepo.findByPk(id, {include: {all:true}});
    if(!foundUser){
      throw new HttpException('User with this id not found', HttpStatus.NOT_FOUND)
    }
    return foundUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    const foundUser = this.userRepo.findByPk(id);
    if(!foundUser){
      throw new HttpException('User with this id not found', HttpStatus.NOT_FOUND)
    }
    return this.userRepo.destroy({where:{id}});
  }


  private async generateToken(user: User){
    const jwtPayload = { id: user.id, is_active: user.is_active };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME
      }),
    ])

    return {
      access_token: accessToken,
      refresh_token: refreshToken
    }
  }
}
