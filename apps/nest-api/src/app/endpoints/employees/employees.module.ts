import { Module } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { EmployeesService } from './employees.service'
import { EmployeesResolver } from './employees.resolver'

@Module({
  providers: [EmployeesResolver, EmployeesService, PrismaService],
  exports: [EmployeesService]
})
export class EmployeesModule {}
