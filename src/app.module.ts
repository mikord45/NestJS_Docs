import { Module } from '@nestjs/common'
// import { AppController } from './sampleApp/app.controller'
// import { AppService } from './sampleApp/app.service'
import { CatsModule } from './cats/cats.module'
// import { SampleAppModule } from './sampleApp/sample.app.module'

@Module({
  imports: [CatsModule /*, SampleAppModule*/],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
