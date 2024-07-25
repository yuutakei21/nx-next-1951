import { IsString, IsDefined, IsBoolean, IsDate } from "class-validator";
import { Department, User } from "./";

export class Tenant {
    @IsDefined()
    @IsString()
    id!: string;

    @IsDefined()
    @IsString()
    name!: string;

    @IsDefined()
    @IsBoolean()
    enabled!: boolean;

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;

    @IsDefined()
    departments!: Department[];

    @IsDefined()
    users!: User[];
}
