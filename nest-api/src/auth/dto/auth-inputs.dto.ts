import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from '../../@generated/prisma-client';
import { UserDto } from '../../dtos/user.entity';

export class LoginUserInput {
  @ApiProperty({ type: String, default: 'admin@example.com' })
  @Type(() => String)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, default: 'Ss123123' })
  @Type(() => String)
  @IsNotEmpty()
  password: string;
}

export class LoginResult {
  @ApiProperty({ type: UserDto })
  user: User;

  @ApiProperty({ type: String })
  token: string;
}
