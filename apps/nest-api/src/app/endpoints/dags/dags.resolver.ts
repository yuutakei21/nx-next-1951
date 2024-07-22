import { Args, Field, Mutation, ObjectType, Resolver } from '@nestjs/graphql'
import { DAGsService } from './dags.service'

@ObjectType()
export class DagResponse {
  @Field(() => String, { nullable: true })
  result: string
}

@Resolver(() => DagResponse)
export class DAGsResolver {
  constructor(private readonly dagsService: DAGsService) {}

  @Mutation(() => DagResponse)
  triggerDAG(
    @Args('dagId', { type: () => String }) dagId: string,
    @Args('bucket', { type: () => String }) bucket: string,
    @Args('key', { type: () => String }) key: string
  ) {
    return this.dagsService.triggerDAG(dagId, { bucket, key })
  }
}
