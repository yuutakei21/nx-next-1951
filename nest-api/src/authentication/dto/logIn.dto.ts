import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class LogInDto {
  @ApiProperty({
    type: () => String,
    required: true,
    default: 'admin@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: () => String,
    required: true,
    default: 'Ss123123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;
}

export default LogInDto;
