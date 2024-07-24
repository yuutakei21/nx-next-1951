import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Type } from 'class-transformer';

export class LoginUserInput {
  @ApiProperty({ type: String })
  @Type(() => String)
  email?: string;

  @ApiProperty({ type: String })
  @Type(() => String)
  password: string;
}

export class LoginResult {
  user: User;

  @Type(() => String)
  token: string;
}

export class SignOutResult {
  user: User;

  @Type(() => String)
  token: null;
}
