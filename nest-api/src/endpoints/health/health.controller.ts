import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { PrismaService } from 'nestjs-prisma';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private prismaHealth: PrismaHealthIndicator,
    private prisma: PrismaService,
  ) {}

  // update operations.ts when you change method name checkHealth
  @Get()
  @HealthCheck()
  checkHealth() {
    return this.health.check([
      async () => this.prismaHealth.pingCheck('prisma', this.prisma),
    ]);
  }
}
