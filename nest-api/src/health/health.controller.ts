import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { CustomPrismaService } from 'nestjs-prisma';
import { PrismaClient } from '@prisma-client';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private prismaHealth: PrismaHealthIndicator,
    @Inject('CustomPrismaClient')
    private prisma: CustomPrismaService<PrismaClient>,
  ) {}

  // update operations.ts when you change method name checkHealth
  @Get()
  @HealthCheck()
  checkHealth() {
    return this.health.check([
      async () => this.prismaHealth.pingCheck('prisma', this.prisma.client),
    ]);
  }
}
