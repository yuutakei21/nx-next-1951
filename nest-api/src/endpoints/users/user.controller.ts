import { UsersService } from './users.service';
import { Controller, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { GetUsersInput, UserCreateInputDto } from './types';
import { UserDto } from '../../@generated/dtos/user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOkResponse({ type: UserDto })
  @Post('create')
  // @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  createUser(@Body() createUserDto: UserCreateInputDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOkResponse({ type: UserDto })
  @ApiParam({ name: 'id' })
  @Put(':id')
  updateUser(@Param() { id }, @Body() userData: UserCreateInputDto) {
    return this.usersService.update(parseInt(id, 10), userData);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  disableUser(@Param() { id }) {
    return this.usersService.disable(parseInt(id, 10));
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
