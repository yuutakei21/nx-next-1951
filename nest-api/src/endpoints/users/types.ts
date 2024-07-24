import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserDto } from '../@generated/dtos/user.dto';

export class UsersWithPagination {
  @ApiProperty({ type: () => UserDto })
  @IsOptional()
  data?: UserDto[];

  @ApiProperty({ type: () => Number })
  count: number;
}

export class SearchUserInput {
  @ApiProperty({ type: () => String })
  name: string;
}

export class SortUserInput {
  @ApiProperty({ type: () => String || Date })
  @IsDate()
  updatedAt: string;
}

export class UserCreateInputDto {
  @ApiProperty({ required: true, type: () => String })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ required: true, type: () => String })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ required: false, type: () => String })
  @IsNotEmpty()
  @IsString()
  role?: string;

  @ApiProperty({ required: false, type: () => String })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ required: false, type: () => String })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ required: false, type: () => Boolean })
  @IsNotEmpty()
  @IsBoolean()
  enabled?: boolean;

  @ApiProperty({ required: false, type: () => Number })
  @IsOptional()
  @IsNumber()
  tenantId?: number;

  @ApiProperty({ required: false, type: () => Number })
  @IsOptional()
  @IsNumber()
  departmentId?: number;

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
  @ApiProperty({ type: () => Number })
  page?: number = 1;

  @ApiProperty({ type: () => Number })
  pageSize?: number = 1000;

  @ApiProperty({ type: () => SearchUserInput })
  search?: SearchUserInput;

  @ApiProperty({ type: () => SortUserInput })
  sort?: SortUserInput;
}
