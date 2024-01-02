import { Controller, Get, UseInterceptors, Inject } from '@nestjs/common'

import { CatsService } from './cats/cats.service'
import { connectionToken } from './utils/constants'
import { ClientProxy, EventPattern } from '@nestjs/microservices'

@Controller('app')
export class AppController {
  constructor(
    private catsService: CatsService,
    @Inject(connectionToken) private connection: string,
    @Inject('RABBIT_MICROSERVICE') private client: ClientProxy,
    @Inject('TCP_MICROSERVICE') private clientTcp: ClientProxy,
  ) {}

  sendEvent() {
    const a = this.client.emit<number>('message1', 'test123')
    const b = this.clientTcp.send('message2', 'test456')
    // b is a 'cold' observable
    b.subscribe((elem) => {
      console.log('test2 elem: ', elem)
    })
  }

  @Get()
  findAll(): string {
    this.catsService.findAll()
    this.sendEvent()
    console.log(this.connection)
    return `These are all requested values: a, b, c, d`
  }
}
