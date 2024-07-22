/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app/app.module'
import { AspectLogger } from './app/log/AspectLogger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalInterceptors(new AspectLogger())

  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)
  const port = process.env.PORT || 3000

  app.enableCors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*'
  })

  await app.listen(port)
  Logger.log(`🚀 Playground is running on: http://localhost:${port}/graphql`)
}

bootstrap()
