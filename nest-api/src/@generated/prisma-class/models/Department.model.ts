import { IsString, IsDefined, IsDate } from "class-validator";
import { Tenant, User } from "./";

export class Department {
    @IsDefined()
    @IsString()
    id!: string;

    @IsDefined()
    @IsString()
    name!: string;

    @IsDefined()
    @IsString()
    tenantId!: string;

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;

    @IsDefined()
    tenant!: Tenant;

    @IsDefined()
    users!: User[];
}
