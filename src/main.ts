import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './http-exception.filter'
// import { logger } from './logger.middleware'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // app.use(logger)
  // app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(3000)
}
bootstrap()
