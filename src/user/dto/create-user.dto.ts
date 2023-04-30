import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString, IsEmail, IsStrongPassword} from "class-validator";
export class CreateUserDto {

    @ApiProperty({example: 'Fakhriddin', description: "username"})
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({example: 'user@mail.com', description: "user email"})
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({example: 'Uzbek!stan1', description: "user password, 10 charecters, at least 1 Capital letter and 1 symbol"})
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

    @ApiProperty({example: 'Uzbek!stan1', description: "user password confirmation"})
    @IsNotEmpty()
    @IsString()
    confirm_password: string;
}
