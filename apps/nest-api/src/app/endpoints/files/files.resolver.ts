import { Args, Field, Mutation, ObjectType, Resolver } from '@nestjs/graphql'
import { FilesService } from './files.service'

@ObjectType()
export class PresignedURL {
  @Field(() => String, { nullable: false })
  url: string
}

@Resolver(() => PresignedURL)
export class FilesResolver {
  constructor(private readonly filesService: FilesService) {}

  @Mutation(() => PresignedURL)
  async getPresignedURL(
    @Args('bucket', { type: () => String }) bucket: string,
    @Args('key', { type: () => String }) key: string
  ) {
    const url = await this.filesService.getPresignedURL(bucket, key)
    return { url }
  }
}
