import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRole } from '../@generated/prisma-client';

export class CreateUserDto {
  @ApiProperty({ type: () => String, default: 'user@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: () => String, default: '123456@Ss' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ type: () => String, default: UserRole.USER })
  @IsEnum(UserRole)
  role?: UserRole = UserRole.USER;

  @ApiProperty({ type: () => String })
  @IsString()
  firstName?: string = '';

  @ApiProperty({ type: () => String })
  @IsString()
  lastName?: string = '';

  @ApiProperty({ type: () => Boolean })
  @IsBoolean()
  enabled?: boolean = true;

  @ApiProperty({ type: () => String })
  @IsNotEmpty()
  tenantId: string;

  @ApiProperty({ type: () => String })
  @IsNotEmpty()
  departmentId: string;
}

export class UpdateUserDto extends OmitType(CreateUserDto, [
  'email',
  'role',
  'tenantId',
  'departmentId',
] as const) {}

export class UserDto extends CreateUserDto {
  @ApiProperty({ type: () => String })
  @IsNotEmpty()
  id: string;

  @ApiProperty({ default: new Date() })
  @IsOptional()
  timestamp: Date | string;

  @ApiProperty({ default: new Date() })
  @IsOptional()
  createdAt: Date | string;

  @ApiProperty({ default: new Date() })
  @IsOptional()
  updatedAt: Date | string;
}
