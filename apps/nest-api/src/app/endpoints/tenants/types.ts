import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import { Tenant } from '@libs/prisma'

@ObjectType()
export class TenantsWithPagination {
  @Field(() => [Tenant], { nullable: true })
  data?: Array<Tenant>
  @Field(() => Int, { nullable: false })
  count: number
}

@InputType()
export class SearchTenantInput {
  @Field(() => String, { nullable: true })
  name: string

  @Field(() => Boolean, { nullable: true })
  enabled: boolean
}

@InputType()
export class SortTenantInput {
  @Field(() => String, { nullable: true })
  updatedAt: string
}
