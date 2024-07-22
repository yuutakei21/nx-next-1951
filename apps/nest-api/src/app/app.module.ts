import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './endpoints/users/users.module'
import { PrismaService } from './prisma/prisma.service'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { GraphQLError, GraphQLFormattedError } from 'graphql'
import { AuthModule } from './endpoints/auth/auth.module'
import { TenantsModule } from './endpoints/tenants/tenants.module'
import { EmployeesModule } from './endpoints/employees/employees.module'
import { FilesModule } from './endpoints/files/files.module'
import { DAGsModule } from './endpoints/dags/dags.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: []
    }),
    // config playground only for development mode
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      formatError: (error: GraphQLError) => {
        let errorMessage = error?.message || ''
        const exception = error?.extensions?.exception
        if (exception) {
          errorMessage = exception['originalError']['message']
        }
        const graphQLFormattedError: GraphQLFormattedError = {
          message: errorMessage
        }
        return graphQLFormattedError
      }
    }),
    AuthModule,
    TenantsModule,
    UsersModule,
    EmployeesModule,
    FilesModule,
    DAGsModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService]
})
export class AppModule {}
