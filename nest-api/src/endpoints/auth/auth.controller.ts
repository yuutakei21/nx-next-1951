import { AuthService } from './auth.service';
import { LoginResult, LoginUserInput } from './dto/auth-inputs.dto';
import { CustomBadRequestCredentialException } from '../../constants/errors';
import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({ type: LoginResult })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @Post()
  async login(@Body() user: LoginUserInput) {
    console.log(user);
    const result = await this.authService.validateUserByPassword(user);

    if (result) return result;
    throw CustomBadRequestCredentialException;
  }

  // There is no username guard here because if the person has the token, they can be any user
  // @Get()
  // async refreshToken(@Body() request: any): Promise<string> {
  //   const user: User = request.user;
  //   if (!user) throw CustomUnauthorizedException;
  //   const result = this.authService.createJwt(user);
  //   if (result) return result.token;
  //   throw CustomUnauthorizedException;
  // }
}
