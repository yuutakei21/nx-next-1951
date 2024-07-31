import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../interfaces/jwt-payload.interfaces';
import { CustomUnauthorizedException } from '../../constants/errors';
import { ConfigService } from '@nestjs/config';
import { JwtConfig } from '../../configuration';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _authService: AuthService,
    configService: ConfigService,
  ) {
    const jwtConfig = configService.get<JwtConfig>('jwt');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secret,
      signOptions: { expiresIn: jwtConfig.expires_in },
      // ignoreExpiration: true,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this._authService.validateJwtPayload(payload);

    if (!user) {
      throw CustomUnauthorizedException;
    }

    return user;
  }
}
