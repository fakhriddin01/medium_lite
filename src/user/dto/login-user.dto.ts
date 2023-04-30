import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString, IsEmail, IsStrongPassword} from "class-validator";
export class LoginUserDto {
    @ApiProperty({example: 'user@mail.com', description: "user email"})
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({example: 'Uzbek!stan1', description: "user password"})
    @IsNotEmpty()
    @IsString()
    password: string;
}