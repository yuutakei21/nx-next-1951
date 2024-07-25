import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomPrismaModule } from 'nestjs-prisma';
import configuration from './configuration';
import { AuthController } from './endpoints/auth/auth.controller';
import { AuthModule } from './endpoints/auth/auth.module';
import { HealthModule } from './endpoints/health/health.module';
import { UsersController } from './endpoints/users/user.controller';
import { UsersModule } from './endpoints/users/users.module';
import { PrismaClient } from './endpoints/@generated/prisma-client/default';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    CustomPrismaModule.forRoot({
      name: 'CustomPrismaClient', // 👈 must be unique for each PrismaClient
      client: new PrismaClient(), // create new instance of PrismaClient
      isGlobal: true,
    }),
    HealthModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [UsersController, AuthController],
  providers: [],
})
export class AppModule {}