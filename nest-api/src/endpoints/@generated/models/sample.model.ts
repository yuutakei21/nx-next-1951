import { IsString, IsNotEmpty } from "class-validator";
import "./";

export class SampleModel {
    @IsNotEmpty()
    @IsString()
    id: string;
}
