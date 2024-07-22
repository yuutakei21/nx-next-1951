import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import { Employee } from '@libs/prisma'

@ObjectType()
export class EmployeesWithPagination {
  @Field(() => [Employee], { nullable: true })
  data?: Array<Employee>
  @Field(() => Int, { nullable: false })
  count: number
}

@InputType()
export class SearchEmployeeInput {
  @Field(() => String, { nullable: true })
  nickname: string
  @Field(() => Boolean, { nullable: true })
  enabled: boolean
}

@InputType()
export class SortEmployeeInput {
  @Field(() => String, { nullable: true })
  updatedAt: string
}
