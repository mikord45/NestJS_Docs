import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './http-exception.filter'
import { ValidationPipe } from './validation.pipe'
import { RolesGuard } from './role.guard'
import { LoggingInterceptor } from './logging.interceptor'
// import { logger } from './logger.middleware'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // app.use(logger)
  // app.useGlobalFilters(new HttpExceptionFilter())
  // app.useGlobalPipes(new ValidationPipe())
  // app.useGlobalGuards(new RolesGuard())
  // app.useGlobalInterceptors(new LoggingInterceptor())
  await app.listen(3000)
}
bootstrap()
