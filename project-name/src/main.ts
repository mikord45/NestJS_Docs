import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './exceptionFilters/http-exception.filter'
import { ValidationPipe } from './pipes/validation.pipe'
import { RolesGuard } from './guards/role.guard'
import { LoggingInterceptor } from './interceptors/logging.interceptor'
// import { logger } from './logger.middleware'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // app.enableCors()
  // app.use(logger)
  // app.useGlobalFilters(new HttpExceptionFilter())
  // app.useGlobalPipes(new ValidationPipe())
  // app.useGlobalGuards(new RolesGuard())
  // app.useGlobalInterceptors(new LoggingInterceptor())
  await app.listen(3000)
}
bootstrap()
