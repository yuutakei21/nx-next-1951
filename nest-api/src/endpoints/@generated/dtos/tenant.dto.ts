import { Prisma } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNotEmpty, IsString, IsBoolean, IsOptional, IsDate } from "class-validator";
import { UserDto, DepartmentDto } from "./";

export class TenantDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsBoolean()
    enabled: boolean;

    @ApiProperty({ required: true, type: () => UserDto })
    @IsOptional()
    users: UserDto[];

    @ApiProperty({ required: true, type: () => DepartmentDto })
    @IsOptional()
    departments: DepartmentDto[];

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsDate()
    createdAt: Date;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsDate()
    updatedAt: Date;
}
