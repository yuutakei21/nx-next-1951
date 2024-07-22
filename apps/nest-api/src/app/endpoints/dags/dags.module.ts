import { Module } from '@nestjs/common'
import { DAGsResolver } from './dags.resolver'
import { DAGsService } from './dags.service'

@Module({
  providers: [DAGsResolver, DAGsService]
})
export class DAGsModule {}
