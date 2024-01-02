import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Transport } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('message2'/*, Transport.TCP*/)
  async handleMessage2(data: string) {
    console.log('test2 data2: ', data);
    return 10;
  }

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
