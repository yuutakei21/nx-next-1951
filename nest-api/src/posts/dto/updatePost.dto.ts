import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({ type: () => String })
  @IsNumber()
  id: string;

  @ApiProperty({ type: () => String })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: () => String })
  @IsString()
  @IsNotEmpty()
  content: string;
}
