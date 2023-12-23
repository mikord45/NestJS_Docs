import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core/services/reflector.service'
import { Observable } from 'rxjs'
import { Roles } from './roles.decorators'

const matchRoles = (routeRoles: string[], userRoles: string[]): boolean => {
  return routeRoles.some((routeRole) => userRoles.includes(routeRole))
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean /*| Promise<boolean> | Observable<boolean>*/ {
    const roles = this.reflector.get(Roles, context.getHandler())
    console.log('test2 roles: ', roles)
    if (!roles) {
      return true
    }
    const request = context.switchToHttp().getRequest()
    const user = request.user
    console.log('test2 user: ', user)
    return matchRoles(roles, user.roles)
  }
}
