import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString, Min, Max} from "class-validator";
export class CreatePostRateDto {
    @ApiProperty({example: '1', description: "rating user(voter) id"})
    @IsNotEmpty()
    @IsInt()
    user_id: number;

    @ApiProperty({example: '1', description: "Post id"})
    @IsNotEmpty()
    @IsInt()
    post_id: number;

    @ApiProperty({example: '5', description: "rate from 1 to 5"})
    @IsNotEmpty()
    @Min(1)
    @Max(5)
    rate: number;
}
