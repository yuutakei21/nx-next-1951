import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from '../../../@generated/prisma-class/user/entities/user.entity';

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
  @ApiProperty({ type: User })
  user: User;

  @ApiProperty({ type: String })
  token: string;
}
