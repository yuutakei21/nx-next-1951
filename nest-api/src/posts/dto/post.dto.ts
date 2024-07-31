import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class PostDto {
  @ApiProperty({ type: () => String })
  @IsString()
  @IsNotEmpty()
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
