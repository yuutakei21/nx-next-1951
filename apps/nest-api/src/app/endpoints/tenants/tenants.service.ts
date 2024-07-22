import {
  TenantCreateInput,
  TenantOrderByWithRelationInput,
  TenantUpdateInput,
  TenantWhereInput
} from '@libs/prisma'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { SearchTenantInput, SortTenantInput } from './types'

@Injectable()
export class TenantsService {
  prisma: PrismaService

  constructor(prisma: PrismaService) {
    this.prisma = prisma
  }

  async create(createInput: TenantCreateInput) {
    const res = await this.prisma.tenant.create({
      data: {
        ...createInput
      }
    })
    console.log(`create tenant id: ${res.id || 'failed'} `)
    return res
  }

  async update(id: string, updateInput: TenantUpdateInput) {
    console.log(`update tenant id: ${id}`)
    return await this.prisma.tenant.update({
      where: {
        id
      },
      data: {
        ...updateInput,
        updatedAt: new Date()
      }
    })
  }

  async disable(id: string) {
    console.log(`disable tenant id: ${id}`)
    return await this.prisma.tenant.update({
      where: {
        id
      },
      data: {
        enabled: false
      }
    })
  }

  normalizeSearchTenant(search: any) {
    const where: TenantWhereInput = {}
    where.AND = []
    if (search) {
      where.AND.push(search)
    }
    return where
  }

  normalizeTenantSort(sort: any) {
    const orderBy: TenantOrderByWithRelationInput[] = []
    if (!sort) return
    orderBy.push(sort)
    return orderBy
  }

  async findAll(
    skip: number,
    pageSize: number,
    search: SearchTenantInput,
    sort: SortTenantInput
  ) {
    const where: TenantWhereInput = this.normalizeSearchTenant(search)
    const orderBy: TenantOrderByWithRelationInput[] =
      this.normalizeTenantSort(sort)
    const take = pageSize

    const data = await this.prisma.tenant.findMany({
      skip,
      take,
      where,
      orderBy
    })

    const count = await this.prisma.tenant.count({ where: where })

    return {
      data,
      count
    }
  }

  findOneByName(name: string) {
    return this.prisma.tenant.findFirst({
      where: {
        name
      }
    })
  }

  async deleteMany(ids: string[]) {
    await this.prisma.tenant.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    })
    return ids
  }
}
