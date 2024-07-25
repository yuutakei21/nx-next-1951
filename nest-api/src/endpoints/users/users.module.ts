import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UsersService } from './users.service';

@Module({
  providers: [UsersController, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
