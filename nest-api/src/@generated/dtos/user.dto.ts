import { Prisma } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNotEmpty, IsString, IsOptional, IsBoolean, IsDate } from "class-validator";
import { TenantDto, DepartmentDto } from "./";

export class UserDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    role: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    firstName?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    lastName?: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsBoolean()
    enabled: boolean;

    @ApiProperty({ required: false, type: () => TenantDto })
    @IsOptional()
    tenant?: TenantDto;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    tenantId?: number;

    @ApiProperty({ required: false, type: () => DepartmentDto })
    @IsOptional()
    department?: DepartmentDto;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    departmentId?: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsDate()
    timestamp: Date;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsDate()
    createdAt: Date;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsDate()
    updatedAt: Date;
}
