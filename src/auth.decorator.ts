import { UseGuards, applyDecorators } from '@nestjs/common'
import { Roles } from './roles.decorators'
import { RolesGuard } from './role.guard'

export const Auth = (...roles: string[]) => {
  return applyDecorators(Roles(roles), UseGuards(RolesGuard))
}
