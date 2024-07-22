import { Module } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { TenantResolver } from './tenants.resolver'
import { TenantsService } from './tenants.service'

@Module({
  providers: [TenantResolver, TenantsService, PrismaService],
  exports: [TenantsService]
})
export class TenantsModule {}
