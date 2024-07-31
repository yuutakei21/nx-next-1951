import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interfaces';
import { LoginResult, LoginUserInput } from './dto/auth-inputs.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../@generated/prisma-client';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private _usersService: UsersService,
    private _jwtService: JwtService,
  ) {}

  checkPassword(password: string, user: User): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(
        password,
        user.password,
        (error: any, isMatch: boolean) => {
          if (error) {
            reject(error);
          }

          resolve(isMatch);
        },
      );
    });
  }

  async validate(loginAttempt: LoginUserInput): Promise<LoginResult> {
    // This will be used for the initial login
    let userToAttempt: User;
    let result: LoginResult = { user: null, token: '' };

    if (loginAttempt.email) {
      userToAttempt = await this._usersService.findOneByEmail(
        loginAttempt.email,
      );
    }

    // If the user is not enabled, disable log in - the token wouldn't work anyways
    if (userToAttempt && userToAttempt.enabled === false)
      userToAttempt = undefined;

    if (!userToAttempt) return undefined;

    // Check the supplied password against the hash stored for this email address
    let isMatch = false;
    try {
      isMatch = await this.checkPassword(loginAttempt.password, userToAttempt);
    } catch (error) {
      return result;
    }

    if (isMatch && userToAttempt) {
      // If there is a successful match, generate a JWT for the user
      const token = this.createJwt(userToAttempt).token;
      result = {
        user: userToAttempt,
        token,
      };
      userToAttempt.timestamp = new Date();
      this._usersService.save(userToAttempt);
      return result;
    }

    return result;
  }

  /**
   * Verifies that the JWT payload associated with a JWT is valid by making sure the user exists and is enabled
   *
   * @param {JwtPayload} payload
   * @returns {(Promise<UserDocument | undefined>)} returns undefined if there is no user or the account is not enabled
   * @memberof {(AuthService JwtStrategy)}
   */
  async validateJwtPayload(payload: JwtPayload): Promise<User | undefined> {
    // This will be used when the user has already logged in and has a JWT
    const user = await this._usersService.findOneByEmail(payload.email);

    // Ensure the user exists and their account isn't disabled
    if (user && user.enabled) {
      user.timestamp = new Date();
      this._usersService.save(user);
      return user;
    }

    return undefined;
  }

  createJwt(user: User): { data: JwtPayload; token: string } {
    const expiresIn = parseInt(process.env.JWT_EXPIRES_IN, 10);
    let expiration: Date | undefined;
    if (expiresIn) {
      expiration = new Date();
      expiration.setTime(expiration.getTime() + expiresIn * 1000);
    }
    const data: JwtPayload = {
      email: user.email,
      role: user.role,
      _id: user.id as any,
      expiration,
    };

    const jwt = this._jwtService.sign(data);

    return {
      data,
      token: jwt,
    };
  }
}
