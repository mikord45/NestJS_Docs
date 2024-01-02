import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('message1')
  async handleMessage1(data: string) {
    console.log('test2 data: ', data);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
