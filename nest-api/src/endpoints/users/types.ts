import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserDto } from '../../@generated/dtos/user.dto';

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

  @ApiProperty({ required: false, type: () => String, default: null })
  @IsNotEmpty()
  @IsString()
  role?: string;

  @ApiProperty({ required: false, type: () => String, default: null })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ required: false, type: () => String, default: null })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ required: false, type: () => Boolean, default: null })
  @IsNotEmpty()
  @IsBoolean()
  enabled?: boolean;

  @ApiProperty({ required: false, type: () => String })
  @IsOptional()
  @IsNumber()
  tenantId?: string;

  @ApiProperty({ required: false, type: () => String })
  @IsOptional()
  @IsNumber()
  departmentId?: string;

  @ApiProperty({ required: false })
  @IsDate()
  timestamp: Date;

  @ApiProperty({ required: false })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ required: false })
  @IsDate()
  updatedAt: Date;
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
