import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomPrismaModule } from 'nestjs-prisma';
import configuration from './configuration';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { UsersController } from './users/user.controller';
import { UsersModule } from './users/users.module';
import { PrismaClient } from './@generated/prisma-client';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
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
    AuthModule,
    UsersModule,
    PostsModule,
  ],
  controllers: [UsersController, AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
