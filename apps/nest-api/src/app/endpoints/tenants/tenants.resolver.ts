import { TenantsService } from './tenants.service'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Tenant, TenantCreateInput, TenantUpdateInput } from '@libs/prisma'
import {
  SearchTenantInput,
  SortTenantInput,
  TenantsWithPagination
} from './types'

@Resolver(() => Tenant)
export class TenantResolver {
  constructor(private readonly tenantsService: TenantsService) {}

  @Mutation(() => Tenant)
  createTenant(@Args('input') createInput: TenantCreateInput) {
    return this.tenantsService.create(createInput)
  }

  @Mutation(() => Tenant)
  updateTenant(
    @Args('id') id: string,
    @Args('input') updateInput: TenantUpdateInput
  ) {
    return this.tenantsService.update(id, updateInput)
  }

  @Mutation(() => Tenant)
  disableTenant(@Args('id') id: string) {
    return this.tenantsService.disable(id)
  }

  @Mutation(() => [String])
  async deleteMultipleTenants(
    @Args('ids', { type: () => [String] })
    ids: string[]
  ) {
    return await this.tenantsService.deleteMany(ids)
  }

  @Query(() => TenantsWithPagination)
  tenants(
    @Args('page', { type: () => Int, defaultValue: 1, nullable: true })
    page?: number,
    @Args('pageSize', { type: () => Int, defaultValue: 1000, nullable: true })
    pageSize?: number,
    @Args('search', {
      type: () => SearchTenantInput,
      defaultValue: {},
      nullable: true
    })
    search?: SearchTenantInput,
    @Args('sort', {
      type: () => SortTenantInput,
      defaultValue: { updatedAt: true },
      nullable: true
    })
    sort?: SortTenantInput
  ) {
    const skip = Math.max(page - 1, 0) * pageSize
    return this.tenantsService.findAll(skip, pageSize, search, sort)
  }
}
