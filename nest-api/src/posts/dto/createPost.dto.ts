import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ type: () => String })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: () => String })
  @IsString()
  @IsNotEmpty()
  content: string;
}
