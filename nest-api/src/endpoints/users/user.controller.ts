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
import { Prisma } from '@prisma/client';
import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('create')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createUser(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.usersService.create(createUserDto);
  }
  // @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  // async users(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.findAll(skip, pageSize, search, sort);
  // }
}
