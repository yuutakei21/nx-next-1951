import { EmployeesService } from './employees.service'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  SearchEmployeeInput,
  SortEmployeeInput,
  EmployeesWithPagination
} from './types'
import {
  Employee,
  EmployeeCreateInput,
  EmployeeUpdateInput
} from '@libs/prisma'

@Resolver(() => Employee)
export class EmployeesResolver {
  constructor(private readonly employeesService: EmployeesService) {}

  @Mutation(() => Employee)
  createEmployee(@Args('input') createInput: EmployeeCreateInput) {
    return this.employeesService.create(createInput)
  }

  @Mutation(() => Employee)
  updateEmployee(
    @Args('id') id: string,
    @Args('input') updateInput: EmployeeUpdateInput
  ) {
    return this.employeesService.update(id, updateInput)
  }

  @Mutation(() => Employee)
  disableEmployee(@Args('id') id: string) {
    return this.employeesService.disable(id)
  }

  @Query(() => Employee)
  employee(@Args('id', { type: () => String }) id: string) {
    return this.employeesService.findOne(id)
  }

  @Query(() => EmployeesWithPagination)
  employees(
    @Args('page', { type: () => Int, defaultValue: 1, nullable: true })
    page?: number,
    @Args('pageSize', { type: () => Int, defaultValue: 1000, nullable: true })
    pageSize?: number,
    @Args('search', {
      type: () => SearchEmployeeInput,
      defaultValue: {},
      nullable: true
    })
    search?: SearchEmployeeInput,
    @Args('sort', {
      type: () => SortEmployeeInput,
      defaultValue: { updatedAt: true },
      nullable: true
    })
    sort?: SortEmployeeInput
  ) {
    const skip = Math.max(page - 1, 0) * pageSize
    return this.employeesService.findAll(skip, pageSize, search, sort)
  }
}
