import { Prisma } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNotEmpty, IsString, IsOptional, IsDate } from "class-validator";
import { UserDto, TenantDto } from "./";

export class DepartmentDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ required: true, type: () => UserDto })
    @IsOptional()
    users: UserDto[];

    @ApiProperty({ required: true, type: () => TenantDto })
    @IsOptional()
    tenant: TenantDto;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber()
    tenantId: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsDate()
    createdAt: Date;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsDate()
    updatedAt: Date;
}
