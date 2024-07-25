import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/auth-inputs.dto';
import {
  CustomBadRequestCredentialException,
  CustomUnauthorizedException,
} from '../../constants/errors';
import { Get, Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../../@generated/prisma-client';

type Login = {
  user: User;
  token: string;
};

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async login(@Body() user: LoginUserInput): Promise<Login> {
    console.log(user);
    const result = await this.authService.validateUserByPassword(user);

    if (result) return result;
    throw CustomBadRequestCredentialException;
  }

  // There is no username guard here because if the person has the token, they can be any user
  @Get()
  async refreshToken(@Body() request: any): Promise<string> {
    const user: User = request.user;
    if (!user) throw CustomUnauthorizedException;
    const result = this.authService.createJwt(user);
    if (result) return result.token;
    throw CustomUnauthorizedException;
  }
}
