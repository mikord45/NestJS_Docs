import { Controller, Get, UseInterceptors, Inject } from '@nestjs/common'

import { CatsService } from './cats/cats.service'
import { connectionToken } from './utils/constants'

@Controller('app')
export class AppController {
  constructor(
    private catsService: CatsService,
    @Inject(connectionToken) private connection: string,
  ) {}

  @Get()
  findAll(): string {
    this.catsService.findAll()
    console.log(this.connection)
    return `These are all requested values: a, b, c, d`
  }
}
