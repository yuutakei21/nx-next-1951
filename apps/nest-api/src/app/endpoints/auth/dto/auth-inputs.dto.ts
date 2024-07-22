import { User } from '@libs/prisma'
import { InputType, Field, ObjectType } from '@nestjs/graphql'

@InputType()
export class LoginUserInput {
  @Field(() => String)
  email?: string
  @Field(() => String)
  password: string
}

@ObjectType()
export class LoginResult {
  @Field(() => User)
  user: User
  @Field(() => String)
  token: string
}

@ObjectType()
export class SignOutResult {
  @Field(() => User)
  user: User
  @Field(() => null)
  token: null
}
