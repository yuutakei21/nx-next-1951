import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor
} from '@nestjs/common'
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { tap } from 'rxjs/operators'
import { v4 as uuidv4 } from 'uuid'

enum OPERATION {
  LOGIN = 'login'
}

@Injectable()
export class AspectLogger implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler) {
    let actionLog = ''
    if (context.getType<GqlContextType>() === 'graphql') {
      const gqlContext = GqlExecutionContext.create(context)
      const request = gqlContext.getContext().req
      // Add request ID,so it can be tracked with response
      const requestId = uuidv4()
      // Put to header, so can attach it to response as well
      request['requestId'] = requestId

      const info = gqlContext.getInfo()
      // parentType: MUTATION or QUERY
      // const parentType = info.parentType.name;
      // operationName: Resolver example LOGIN
      const operationName: string = info.fieldName.toLocaleLowerCase()
      actionLog = `[START]|[REQ_ID]:[${requestId}]|[OP]:[${operationName}]`
      if (operationName === OPERATION.LOGIN) {
        const email = request.body?.variables.user?.email
        actionLog = `${actionLog}|[EMAIL]:[${email}]|[TIME]:[${Date.now()}]`
      } else {
        const token = request.headers['authorization']
        try {
          const decodedToken = jwtDecode<JwtPayload>(token)
          const userId = decodedToken['_id']
          // request['userId'] = userId;
          actionLog = `${actionLog}|[USER_ID]:[${userId}]|[TIME]:[${Date.now()}]`
        } catch (err: any) {
          //swallow invalid token missing part #2 error
        }
      }
    }
    Logger.verbose(actionLog)
    return next.handle().pipe(
      tap({
        next: (val: unknown): void => {
          this.logNext(val, context)
        }
      })
    )
  }

  /**
   * Method to log response message
   */
  private logNext(body: unknown, context: ExecutionContext): void {
    // default REST Api
    // if (context.getType() === 'http') {}
    if (context.getType<GqlContextType>() === 'graphql') {
      const gqlContext = GqlExecutionContext.create(context)
      // const info = gqlContext.getInfo();
      const logContext = gqlContext.getContext()
      const requestId = logContext.req.requestId
      const operationName = gqlContext.getInfo().fieldName
      // Remove secure fields from request body and headers
      // const { token, password, ...secureBody } = body as any;
      const actionLog = `[END]|[REQ_ID]:[${requestId}]|[OP]:[${operationName}]`
      // const actionLog = `[END]|[REQ_ID]:[${requestId}]|[OP]:[${operationName}]|[INFO]:[${JSON.stringify(body)}]`;
      Logger.verbose(actionLog)
    }
  }
}
