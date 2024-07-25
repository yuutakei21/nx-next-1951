import { IsString, IsDefined, IsBoolean, IsDate, IsIn } from "class-validator";
import { Department, Tenant } from "./";
import { getEnumValues } from "../helpers";
import { UserRole } from "../enums";

export class User {
    @IsDefined()
    @IsString()
    id!: string;

    @IsDefined()
    @IsString()
    email!: string;

    @IsDefined()
    @IsString()
    firstName!: string;

    @IsDefined()
    @IsString()
    lastName!: string;

    @IsDefined()
    @IsString()
    password!: string;

    @IsDefined()
    @IsBoolean()
    enabled!: boolean;

    @IsDefined()
    @IsString()
    tenantId!: string;

    @IsDefined()
    @IsString()
    departmentId!: string;

    @IsDefined()
    @IsDate()
    timestamp!: Date;

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;

    @IsDefined()
    @IsIn(getEnumValues(UserRole))
    role!: UserRole;

    @IsDefined()
    department!: Department;

    @IsDefined()
    tenant!: Tenant;
}
