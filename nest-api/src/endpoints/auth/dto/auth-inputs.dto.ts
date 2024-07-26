import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from '../../../@generated/prisma-client';
import { UserDto } from '../../../dtos/user.entity';

export class LoginUserInput {
  @ApiProperty({ type: String })
  @Type(() => String)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String })
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
