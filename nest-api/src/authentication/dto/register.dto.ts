import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  IsNumber,
} from 'class-validator';
import { UserRole } from '@prisma-client';

export class RegisterDto {
  @ApiProperty({ type: () => String, required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ type: () => String, required: true })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ type: () => String, required: true })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ type: () => String, required: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;

  @ApiProperty({ type: () => String, required: true, default: UserRole.USER })
  role: UserRole;

  @ApiProperty({ type: () => Number, required: true })
  @IsNumber()
  tenantId: number;

  @ApiProperty({ type: () => Number, required: true })
  @IsNumber()
  departmentId: number;
}
export default RegisterDto;
