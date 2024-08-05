import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import * as Joi from 'joi';
import { CustomPrismaModule } from 'nestjs-prisma';
import { PrismaClient } from '@prisma-client';
import { HealthModule } from './health/health.module';
import { UsersController } from './users/user.controller';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthenticationController } from './authentication/authentication.controller';
import JwtAuthenticationGuard from './authentication/jwt-authentication.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    CustomPrismaModule.forRoot({
      name: 'CustomPrismaClient', // 👈 must be unique for each PrismaClient
      client: new PrismaClient({
        datasources: {
          db: {
            url: process.env.DATABASE_URL,
          },
        },
      }), // create new instance of PrismaClient
      isGlobal: true,
    }),
    HealthModule,
    AuthenticationModule,
    UsersModule,
  ],
  controllers: [UsersController, AuthenticationController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthenticationGuard,
    },
  ],
})
export class AppModule {}
