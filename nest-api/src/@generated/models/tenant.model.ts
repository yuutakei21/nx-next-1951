import { Prisma } from "@prisma/client";
import { IsNumber, IsNotEmpty, IsString, IsBoolean, IsOptional, IsDate } from "class-validator";
import { UserModel, DepartmentModel } from "./";

export class TenantModel {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsBoolean()
    enabled: boolean;

    @IsOptional()
    users: UserModel[];

    @IsOptional()
    departments: DepartmentModel[];

    @IsNotEmpty()
    @IsDate()
    createdAt: Date;

    @IsNotEmpty()
    @IsDate()
    updatedAt: Date;
}
