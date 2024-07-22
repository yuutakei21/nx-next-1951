import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import { User } from '@libs/prisma'

@ObjectType()
export class UsersWithPagination {
  @Field(() => [User], { nullable: true })
  data?: Array<User>
  @Field(() => Int, { nullable: false })
  count: number
}

@InputType()
export class SearchUserInput {
  @Field(() => String, { nullable: true })
  name: string
  // @Field(() => Int, { nullable: true })
  // maxAge: number;
  // @Field(() => Boolean, { nullable: true })
  // hasExpired?: boolean;
}

@InputType()
export class SortUserInput {
  @Field(() => String, { nullable: true })
  updatedAt: string
}
