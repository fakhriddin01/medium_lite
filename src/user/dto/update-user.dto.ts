import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString, IsEmail, IsStrongPassword, IsOptional} from "class-validator";

export class UpdateUserDto {
    @ApiProperty({example: 'Fakhriddin', description: "username"})
    @IsString()
    @IsOptional()
    username?: string;

    @ApiProperty({example: '', description: "updates when post rate updates"})
    @IsOptional()
    user_rate?: number;
}
