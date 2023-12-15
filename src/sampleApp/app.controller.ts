import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { CatsService } from 'src/cats/cats.service'

@Controller('cats' /*{ host: 'localhost2', path: '' }*/)
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly catsService: CatsService,
  ) {}

  @Get()
  /*async*/
  async getHello(): Promise<any[]> {
    /* return 5 */
    /* return of(10, 20) */
    /*
    const promise = new Promise((res, rej) => {
      res('XD')
    })

    return promise
    */
    // return this.appService.getHello()
    const list = await this.catsService.findAll()
    return [1, 2, 3] as any[]
  }
}
