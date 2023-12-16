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
import { logger /*, logger2*/ } from './logger.middleware'
import { APP_FILTER } from '@nestjs/core'
import { HttpExceptionFilter } from './http-exception.filter'
import { AllExceptionsFilter } from './all-exceptions.filter'
// import { SampleAppModule } from './sampleApp/sample.app.module'

@Module({
  imports: [CatsModule /*, SampleAppModule*/],
  // controllers: [AppController],
  providers: [
    /*AppService,*/ {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
      // useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(/*logger2,*/ logger)
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
  }
}
