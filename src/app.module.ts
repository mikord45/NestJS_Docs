import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
// import { AppController } from './sampleApp/app.controller'
// import { AppService } from './sampleApp/app.service'
import { CatsModule } from './cats/cats.module'
import { CatsController } from './cats/cats.controller'
import {
  // LoggerMiddleware,
  logger /*, logger2, logger3*/,
} from './logger.middleware'
import { simpleAuthentication } from './simple-authentication.middleware'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { HttpExceptionFilter } from './http-exception.filter'
import { AllExceptionsFilter } from './all-exceptions.filter'
import { ValidationPipe } from './validation.pipe'
import { RolesGuard } from './role.guard'
import { LoggingInterceptor } from './logging.interceptor'
import { TransformInterceptor } from './transform.interceptor'
import { ErrorsInterceptor } from './errors.interceptor'
import { TimeoutInterceptor } from './timeout.interceptor'
// import { SampleAppModule } from './sampleApp/sample.app.module'

@Module({
  imports: [CatsModule /*, SampleAppModule*/],
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
