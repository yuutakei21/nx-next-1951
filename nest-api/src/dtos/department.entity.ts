import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDepartmentDto {
  @ApiProperty({ type: () => String, default: 'TENANT001' })
  @IsNotEmpty()
  name: string;
}

export class UpdateDepartmentDto extends CreateDepartmentDto {}

export class DepartmentDto extends CreateDepartmentDto {
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
