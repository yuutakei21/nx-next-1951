import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomBadRequestCredentialException } from '../../constants/errors';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    return request;
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || CustomBadRequestCredentialException;
    }
    return user;
  }
}
