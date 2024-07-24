import { Prisma } from "@prisma/client";
import { IsNumber, IsNotEmpty, IsString, IsOptional, IsDate } from "class-validator";
import { UserModel, TenantModel } from "./";

export class DepartmentModel {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    users: UserModel[];

    @IsOptional()
    tenant: TenantModel;

    @IsNotEmpty()
    @IsNumber()
    tenantId: number;

    @IsNotEmpty()
    @IsDate()
    createdAt: Date;

    @IsNotEmpty()
    @IsDate()
    updatedAt: Date;
}
