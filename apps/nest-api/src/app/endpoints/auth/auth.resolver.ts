import { User } from '@libs/prisma'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { LoginResult, LoginUserInput } from './dto/auth-inputs.dto'
import {
  CustomBadRequestCredentialException,
  CustomUnauthorizedException
} from '../../constants/errors'

type Login = {
  user: User
  token: string
}

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResult)
  async login(@Args('user') user: LoginUserInput): Promise<Login> {
    const result = await this.authService.validateUserByPassword(user)

    if (result) return result
    throw CustomBadRequestCredentialException
  }

  // There is no username guard here because if the person has the token, they can be any user
  @Query(() => String)
  async refreshToken(@Context('req') request: any): Promise<string> {
    const user: User = request.user
    if (!user) throw CustomUnauthorizedException
    const result = this.authService.createJwt(user)
    if (result) return result.token
    throw CustomUnauthorizedException
  }
}
