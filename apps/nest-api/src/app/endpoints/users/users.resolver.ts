import { UsersService } from './users.service'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { SearchUserInput, SortUserInput, UsersWithPagination } from './types'
import { User, UserCreateInput, UserUpdateInput } from '@libs/prisma'

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('input') createInput: UserCreateInput) {
    return this.usersService.create(createInput)
  }

  @Mutation(() => User)
  updateUser(
    @Args('id') id: string,
    @Args('input') updateInput: UserUpdateInput
  ) {
    return this.usersService.update(id, updateInput)
  }

  @Mutation(() => User)
  disableUser(@Args('id') id: string) {
    return this.usersService.disable(id)
  }

  @Query(() => UsersWithPagination)
  users(
    @Args('page', { type: () => Int, defaultValue: 1, nullable: true })
    page?: number,
    @Args('pageSize', { type: () => Int, defaultValue: 1000, nullable: true })
    pageSize?: number,
    @Args('search', {
      type: () => SearchUserInput,
      defaultValue: {},
      nullable: true
    })
    search?: SearchUserInput,
    @Args('sort', {
      type: () => SortUserInput,
      defaultValue: { updatedAt: true },
      nullable: true
    })
    sort?: SortUserInput
  ) {
    const skip = Math.max(page - 1, 0) * pageSize
    return this.usersService.findAll(skip, pageSize, search, sort)
  }
}
