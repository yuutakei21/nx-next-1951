import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { User as UserDto } from '../@generated/prisma-class/models';
import { UserRole } from '../@generated/prisma-class/enums/UserRole.enum';

export class UsersWithPagination {
  @ApiProperty({ type: () => UserDto })
  @IsOptional()
  data?: UserDto[];

  @ApiProperty({ type: () => Number })
  count: number;
}

export class SearchUserInput {
  @ApiProperty({ type: () => String })
  email: string;

  @ApiProperty({ type: () => String })
  enabled: string;
}

export class SortUserInput {
  @ApiProperty({ enum: ['asc', 'desc'] })
  @IsDate()
  updatedAt: 'asc' | 'desc';
}

export class UserCreateInputDto {
  @ApiProperty({
    required: true,
    type: () => String,
    default: 'user@example.com',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ required: true, type: () => String, default: '123456@Ss' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ required: false, type: () => String })
  @IsEnum(UserRole)
  role?: UserRole = UserRole.USER;

  @ApiProperty({ required: false, type: () => String })
  @IsString()
  firstName?: string = '';

  @ApiProperty({ required: false, type: () => String })
  @IsString()
  lastName?: string = '';

  @ApiProperty({ required: false, type: () => Boolean })
  @IsBoolean()
  enabled?: boolean = true;

  @ApiProperty({ required: true, type: () => String })
  @IsNotEmpty()
  tenantId: string;

  @ApiProperty({ required: true, type: () => String })
  @IsNotEmpty()
  departmentId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  timestamp: Date | string;

  @ApiProperty({ required: false })
  @IsOptional()
  createdAt: Date | string;

  @ApiProperty({ required: false })
  @IsOptional()
  updatedAt: Date | string;
}

export class GetUsersInput {
  @ApiProperty({ type: () => Number, default: 1 })
  page?: number = 1;

  @ApiProperty({ type: () => Number, default: 1000 })
  pageSize?: number = 1000;

  @ApiProperty({ type: () => SearchUserInput, default: null })
  search?: SearchUserInput;

  @ApiProperty({ type: () => SortUserInput, default: { updatedAt: 'desc' } })
  sort?: SortUserInput = { updatedAt: 'desc' };
}
