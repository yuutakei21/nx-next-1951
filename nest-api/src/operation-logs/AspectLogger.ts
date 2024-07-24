import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
// import { jwtDecode, JwtPayload } from 'jwt-decode';
import { tap } from 'rxjs/operators';
import { OPERATION_HEALTHCHECK } from 'src/constants/operations';
import { v4 as uuidv4 } from 'uuid';

enum OPERATION {
  LOGIN = 'login',
}

@Injectable()
export class AspectLogger implements NestInterceptor {
  async intercept(ctx: ExecutionContext, next: CallHandler) {
    let actionLog = '';
    const operationName = ctx.getHandler().name;

    if (ctx.getType() === 'http' && operationName !== OPERATION_HEALTHCHECK) {
      const requestId = uuidv4();

      const request = ctx.switchToHttp().getRequest<Request>();
      request['requestId'] = requestId;
      console.log(operationName);
      actionLog = `[START]|[REQ_ID]:[${requestId}]|[OP]:[${operationName}]`;
      if (operationName === OPERATION.LOGIN) {
        const email = request.body['email'];
        actionLog = `${actionLog}|[EMAIL]:[${email}]|[TIME]:[${Date.now()}]`;
      } else {
        // const token = request.headers['authorization'];
        try {
          // const decodedToken = jwtDecode<JwtPayload>(token);
          // const userId = decodedToken['_id'];
          // request['userId'] = userId;
          const userId = 'test';
          actionLog = `${actionLog}|[USER_ID]:[${userId}]|[TIME]:[${Date.now()}]`;
          Logger.verbose(actionLog);
        } catch (err: any) {
          //swallow invalid token missing part #2 error
        }
      }
    }

    return next.handle().pipe(
      tap({
        next: (val: unknown): void => {
          this.logNext(val, ctx);
        },
      }),
    );
  }

  /**
   * Method to log response message
   */
  private logNext(body: unknown, ctx: ExecutionContext): void {
    const operationName = ctx.getHandler().name;
    if (ctx.getType() === 'http' && operationName !== OPERATION_HEALTHCHECK) {
      const request = ctx.switchToHttp().getRequest<any>();
      const requestId = request.requestId;
      // Remove secure fields from request body and headers
      // const { token, password, ...secureBody } = body as any;
      const actionLog = `[END]|[REQ_ID]:[${requestId}]|[OP]:[${operationName}]`;
      // const actionLog = `[END]|[REQ_ID]:[${requestId}]|[OP]:[${operationName}]|[INFO]:[${JSON.stringify(body)}]`;
      Logger.verbose(actionLog);
    }
  }
}
