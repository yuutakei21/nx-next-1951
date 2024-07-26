import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTenantDto {
  @ApiProperty({ type: () => String, default: 'TENANT001' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: () => Boolean })
  @IsBoolean()
  enabled?: boolean = true;
}

export class UpdateTenantDto extends CreateTenantDto {}

export class TenantDto extends CreateTenantDto {
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
