import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import configuration from './configuration';
import { AuthController } from './endpoints/auth/auth.controller';
import { AuthModule } from './endpoints/auth/auth.module';
import { HealthModule } from './endpoints/health/health.module';
import { UsersController } from './endpoints/users/user.controller';
import { UsersModule } from './endpoints/users/users.module';
import { PrismaConfigService } from './prisma/prisma.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    PrismaModule.forRootAsync({
      isGlobal: true,
      useClass: PrismaConfigService,
    }),
    HealthModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [UsersController, AuthController],
  providers: [],
})
export class AppModule {}
