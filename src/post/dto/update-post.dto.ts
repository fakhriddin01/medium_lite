import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString, IsOptional} from "class-validator";
export class UpdatePostDto {

    @ApiProperty({example: 'Node.js Basics', description: "Post title"})
    @IsString()
    @IsOptional()
    title?: string;

    
    @ApiProperty({example: 'JavaScript is one of the most popular programming languages. The powerful Node.js runtime', description: "Post content"})
    @IsString()
    @IsOptional()
    content?: string;

    @ApiProperty({example: '1', description: "Post author(user) id"})
    @IsInt()
    @IsOptional()
    user_id?: number;

    @ApiProperty({example: '4', description: "new average rating, updates automaticaly"})
    @IsOptional()
    average_rating?: number | null;
}
