import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString} from "class-validator";
export class CreatePostDto {

    @ApiProperty({example: 'Node.js Basics', description: "Post title"})
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({example: 'JavaScript is one of the most popular programming languages. The powerful Node.js runtime', description: "Post content"})
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiProperty({example: '1', description: "Post author(user) id"})
    @IsNotEmpty()
    @IsInt()
    user_id: number;
}
