import { Catch, ArgumentsHost } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Response } from 'express'

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  number: number = 0
  catch(exception: unknown, host: ArgumentsHost) {
    /*this.number += 1
    if (this.number % 2 == 0) {
      console.log(this.number)
      const ctx = host.switchToHttp()
      const response = ctx.getResponse<Response>()

      return response.status(502).json({
        statusCode: 502,
        timestamp: new Date().toISOString(),
        // path: request.url,
      })
    }*/
    super.catch(exception, host)
  }
}
