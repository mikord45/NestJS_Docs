import { Request, Response, NextFunction } from 'express'

interface IUser {
  name: string
  roles: string[]
}

interface IEnhancedRequest extends Request {
  user: IUser
}
export const simpleAuthentication = (
  req: IEnhancedRequest,
  res: Response,
  next: NextFunction,
) => {
  req.user = {
    name: 'Test 123',
    roles: ['admin'],
  }
  next()
}
