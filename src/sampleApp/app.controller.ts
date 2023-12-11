import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { of } from 'rxjs'

@Controller(/*{ host: 'localhost2', path: '' }*/)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  /*async*/
  getHello(): /*Promise<any>*/ string {
    /* return 5 */
    /* return of(10, 20) */
    /*
    const promise = new Promise((res, rej) => {
      res('XD')
    })

    return promise
    */
    return this.appService.getHello()
  }
}
