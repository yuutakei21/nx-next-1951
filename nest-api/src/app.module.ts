import { Module } from '@nestjs/common';
import { HealthModule } from './endpoints/health/health.module';
import { UsersModule } from './endpoints/users/users.module';
import { UsersController } from './endpoints/users/user.controller';
import { AuthModule } from './endpoints/auth/auth.module';
import { AuthController } from './endpoints/auth/auth.controller';

@Module({
  imports: [HealthModule, AuthModule, UsersModule],
  controllers: [UsersController, AuthController],
  providers: [],
})
export class AppModule {}
