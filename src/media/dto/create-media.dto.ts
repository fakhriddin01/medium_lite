import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsNumber} from "class-validator";

export class CreateMediaDto {

    @ApiProperty({example: '1', description: "Post id"})
    @IsNotEmpty()
    post_id: number;

}
