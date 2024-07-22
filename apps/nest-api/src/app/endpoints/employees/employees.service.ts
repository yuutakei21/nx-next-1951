/* eslint-disable @typescript-eslint/no-empty-function */
import {
  EmployeeCreateInput,
  EmployeeOrderByWithRelationInput,
  EmployeeUpdateInput,
  EmployeeWhereInput
} from '@libs/prisma'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { SearchEmployeeInput, SortEmployeeInput } from './types'

@Injectable()
export class EmployeesService {
  prisma: PrismaService

  constructor(prisma: PrismaService) {
    this.prisma = prisma
  }

  async create(createInput: EmployeeCreateInput) {
    console.log(`create employee`)
    const res = await this.prisma.employee.create({
      data: {
        ...createInput
      }
    })
    console.log(`create employee id: ${res.id}`)
    return res
  }

  async update(id: string, updateInput: EmployeeUpdateInput) {
    console.log(`update employee id: ${id}`)
    return await this.prisma.employee.update({
      where: {
        id
      },
      data: {
        ...updateInput
      }
    })
  }

  async disable(id: string) {
    console.log(`disable employee id: ${id}`)
    return await this.prisma.employee.update({
      where: {
        id
      },
      data: {
        enabled: false
      }
    })
  }

  normalizeSearchEmployee(search: any) {
    const where: EmployeeWhereInput = {}
    where.AND = []
    if (search) {
      where.AND.push(search)
    }
    return where
  }

  normalizeEmployeeSort(sort: any) {
    const orderBy: EmployeeOrderByWithRelationInput[] = []
    if (!sort) return
    orderBy.push(sort)
    return orderBy
  }

  async findAll(
    skip: number,
    pageSize: number,
    search: SearchEmployeeInput,
    sort: SortEmployeeInput
  ) {
    const where: EmployeeWhereInput = this.normalizeSearchEmployee(search)
    const orderBy: EmployeeOrderByWithRelationInput[] =
      this.normalizeEmployeeSort(sort)
    const take = pageSize
    const data = await this.prisma.employee.findMany({
      skip,
      take,
      where,
      orderBy
    })
    const count = await this.prisma.employee.count({ where: where })

    return {
      data,
      count
    }
  }

  findOneByNickname(nickname: string) {
    return this.prisma.employee.findFirst({
      where: {
        nickname
      }
    })
  }

  findOne(id: string) {
    return this.prisma.employee.findUnique({
      where: {
        id
      }
    })
  }
}
