import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomPrismaModule } from 'nestjs-prisma';
import configuration from './configuration';
import { AuthController } from './endpoints/auth/auth.controller';
import { AuthModule } from './endpoints/auth/auth.module';
import { HealthModule } from './endpoints/health/health.module';
import { UsersController } from './endpoints/users/user.controller';
import { UsersModule } from './endpoints/users/users.module';
import { PrismaClient } from './@generated/prisma-client';

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
  ],
  controllers: [UsersController, AuthController],
  providers: [],
})
export class AppModule {}
