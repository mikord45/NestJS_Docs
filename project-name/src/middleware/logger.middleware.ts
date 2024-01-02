import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { CatsService } from '../cats/cats.service'

/*@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // constructor(private catsService: CatsService) {
  //  console.log('test2 catsService: ', catsService)
  //}
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...')
    next()
  }
}*/

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Request...')
  next()
}

/*export function logger2(req: Request, res: Response, next: NextFunction) {
  console.log('Request 2...')
  next()
}

export function logger3(req: Request, res: Response, next: NextFunction) {
  console.log('Request 3...')
  next()
}*/
