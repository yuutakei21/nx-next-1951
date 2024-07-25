// import { UsersService } from './users.service';
// import { SearchUserInput, SortUserInput, UsersWithPagination } from './types';

// @Resolver(() => User)
// export class UsersResolver {
//   constructor(private readonly usersService: UsersService) {}

//   @Mutation(() => User)
//   createUser(@Args('input') createInput: UserCreateInput) {
//     return this.usersService.create(createInput);
//   }

//   @Mutation(() => User)
//   updateUser(
//     @Args('id') id: string,
//     @Args('input') updateInput: UserUpdateInput,
//   ) {
//     return this.usersService.update(id, updateInput);
//   }

//   @Mutation(() => User)
//   disableUser(@Args('id') id: string) {
//     return this.usersService.disable(id);
//   }

//   @Query(() => UsersWithPagination)
//   users(
//     @Args('page', { type: () => Int, defaultValue: 1, nullable: true })
//     page?: number,
//     @Args('pageSize', { type: () => Int, defaultValue: 1000, nullable: true })
//     pageSize?: number,
//     @Args('search', {
//       type: () => SearchUserInput,
//       defaultValue: {},
//       nullable: true,
//     })
//     search?: SearchUserInput,
//     @Args('sort', {
//       type: () => SortUserInput,
//       defaultValue: { updatedAt: true },
//       nullable: true,
//     })
//     sort?: SortUserInput,
//   ) {
//     const skip = Math.max(page - 1, 0) * pageSize;
//     return this.usersService.findAll(skip, pageSize, search, sort);
//   }
// }
import { UsersService } from './users.service';
import { Controller, Post, Body } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetUsersInput, UserCreateInputDto } from './types';
import { UserDto } from '@generated/dtos/user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOkResponse({
    type: UserDto,
  })
  @Post('create')
  // @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  createUser(@Body() createUserDto: UserCreateInputDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOkResponse({
    type: UserDto,
    isArray: true,
  })
  @Post('all')
  async users(@Body() getUsersInput: GetUsersInput) {
    const { page, pageSize, search, sort } = getUsersInput;
    const skip = Math.max(page - 1, 0) * pageSize;
    return this.usersService.findAll(skip, pageSize, search, sort);
  }
}
