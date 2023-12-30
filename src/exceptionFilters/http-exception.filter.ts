import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common'
import { Request, Response } from 'express'

import { CatsService } from '../cats/cats.service'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // constructor(private catsService: CatsService) {
  //   console.log('test2 catsService: ', catsService.findAll())
  // }
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    })
  }
}
