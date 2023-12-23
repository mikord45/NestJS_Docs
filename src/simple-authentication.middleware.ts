import { Request, Response, NextFunction } from 'express'

interface IEnhancedRequest extends Request {
  user: {
    roles: string[]
  }
}
export const simpleAuthentication = (
  req: IEnhancedRequest,
  res: Response,
  next: NextFunction,
) => {
  req.user = {
    roles: ['admin'],
  }
  next()
}
