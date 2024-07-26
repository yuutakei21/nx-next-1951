import { UsersService } from './users.service';
import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { GetUsersInput, UserCreateInputDto } from './types';
import { CreateUserDto } from '../../@generated/prisma-class/user/dto/create-user.dto';
import { User } from '../../@generated/prisma-class/user/entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOkResponse({ type: User })
  @Post('create')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOkResponse({ type: User })
  @ApiParam({ name: 'id' })
  @Put(':id')
  updateUser(@Param() { id }, @Body() userData: UserCreateInputDto) {
    return this.usersService.update(id, userData);
  }

  @ApiOkResponse({ type: User })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  disableUser(@Param() { id }) {
    return this.usersService.disable(id);
  }

  @ApiOkResponse({
    type: User,
    isArray: true,
  })
  @Post('all')
  async users(@Body() getUsersInput: GetUsersInput) {
    const { page, pageSize, search, sort } = getUsersInput;
    const skip = Math.max(page - 1, 0) * pageSize;
    return this.usersService.findAll(skip, pageSize, search, sort);
  }
}
