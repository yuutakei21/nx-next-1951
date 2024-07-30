import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Prisma } from '../../@generated/prisma-client';
import { GetUsersInput } from './types';
import { UserDto } from '../../dtos/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOkResponse({ type: UserDto })
  @Post('create')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  createUser(@Body() createUserDto: Prisma.UserUncheckedCreateInput) {
    return this.usersService.create(createUserDto);
  }

  @ApiOkResponse({ type: UserDto })
  @ApiParam({ name: 'id' })
  @Put(':id')
  updateUser(
    @Param() { id },
    @Body() userData: Prisma.UserUncheckedUpdateInput,
  ) {
    return this.usersService.update(id, userData);
  }

  @ApiOkResponse({ type: UserDto })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  disableUser(@Param() { id }) {
    return this.usersService.disable(id);
  }

  @ApiOkResponse({
    type: UserDto,
    isArray: true,
  })
  @Post('all')
  async users(@Body() getUsersInput: GetUsersInput) {
    const { page, pageSize, search, sort } = getUsersInput;
    const skip = page > 1 ? Math.max(page - 1, 0) * pageSize : 0;
    return this.usersService.findAll(skip, pageSize, search, sort);
  }
}
