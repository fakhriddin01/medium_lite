import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsOptional} from "class-validator";

export class UpdateMediaDto  {
    @ApiProperty({example: '1', description: "Post id"})
    @IsInt()
    @IsOptional()
    post_id?: number;
}
