import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";
import "./";

export class SampleDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    id: string;
}
