import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { CatsModule } from './cats/cats.module'
import { CatsController } from './cats/cats.controller'
import {
  // LoggerMiddleware,
  logger /*, logger2, logger3*/,
} from './middleware/logger.middleware'
import { simpleAuthentication } from './middleware/simple-authentication.middleware'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { HttpExceptionFilter } from './exceptionFilters/http-exception.filter'
import { AllExceptionsFilter } from './exceptionFilters/all-exceptions.filter'
import { ValidationPipe } from './pipes/validation.pipe'
import { RolesGuard } from './guards/role.guard'
import { LoggingInterceptor } from './interceptors/logging.interceptor'
import { TransformInterceptor } from './interceptors/transform.interceptor'
import { ErrorsInterceptor } from './interceptors/errors.interceptor'
import { TimeoutInterceptor } from './interceptors/timeout.interceptor'

@Module({
  imports: [CatsModule],
  // controllers: [AppController],
  providers: [
    /*AppService,*/ {
      provide: APP_FILTER,
      // useClass: HttpExceptionFilter,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(/*logger3, LoggerMiddleware, */ simpleAuthentication, logger)
      /*.exclude(
        { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
        'cats/(.*)',
      )*/
      .forRoutes(
        CatsController,
        // {
        //   path: 'cats',
        //   method: RequestMethod.GET,
        // },
      )

    /*consumer
      .apply(logger3, logger2, logger)
      .forRoutes({ path: 'cats', method: RequestMethod.GET })
    */
  }
}
