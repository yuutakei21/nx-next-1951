import { Prisma } from "@prisma/client";
import { IsNumber, IsNotEmpty, IsString, IsOptional, IsBoolean, IsDate } from "class-validator";
import { TenantModel, DepartmentModel } from "./";

export class UserModel {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    role: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsOptional()
    @IsString()
    firstName?: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsBoolean()
    enabled: boolean;

    @IsOptional()
    tenant?: TenantModel;

    @IsOptional()
    @IsNumber()
    tenantId?: number;

    @IsOptional()
    department?: DepartmentModel;

    @IsOptional()
    @IsNumber()
    departmentId?: number;

    @IsNotEmpty()
    @IsDate()
    timestamp: Date;

    @IsNotEmpty()
    @IsDate()
    createdAt: Date;

    @IsNotEmpty()
    @IsDate()
    updatedAt: Date;
}
