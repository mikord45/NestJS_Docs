import { Module, Global } from '@nestjs/common'
import { CatsController } from './cats.controller'
import { CatsService } from './cats.service'

import { connectionToken } from '../utils/constants'
import { connection } from '../common/connection'

// const mockCatsService = {}

@Global()
@Module({
  controllers: [CatsController],
  providers: [
    // {
    //   provide: CatsService,
    //   useValue: mockCatsService,
    // },
    CatsService,
    // useFactory example
    {
      provide: connectionToken,
      useFactory: (
        provider1: string,
        provider2?: string,
        provider3?: string,
      ) => {
        console.log(`${provider1} - ${provider2 || ''} - ${provider3 || ''}`)
        return `${provider1} - ${provider2 || ''} - ${provider3 || ''}`
      },
      inject: [
        'PROVIDER1',
        { token: 'PROVIDER2', optional: true },
        { token: 'PROVIDER3', optional: true },
      ],
    },
    { provide: 'PROVIDER1', useValue: 'VALUE - 1' },
    { provide: 'PROVIDER2', useValue: 'VALUE - 2' },
    // useExisting example
    { provide: 'PROVIDER3', useExisting: 'PROVIDER1' },
    /*// useValue example
    { provide: connectionToken, useValue: connection },*/
    // this is also possible - different token, different class. In docs example, equivalent of First Class is an abstract class
    // and object, that is visible below is created at the top of this file - outside of the 'providers' array
    /*{
      provide: FirstClass
      useClass: condition ? SecondClass : ThirdClass
    }
    */
  ],
  exports: [CatsService, connectionToken],
  // you can export 'connectionToken' provider by assigning entire provider object to the const and including it in the 'exports' array
})
export class CatsModule {
  //   constructor(private catsService: CatsService) {} // example of injection in module's constructor
}
