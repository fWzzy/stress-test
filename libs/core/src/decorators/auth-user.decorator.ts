import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export function AuthUser<T>(uKey: keyof T = null) {
  return createParamDecorator((_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return uKey ? user && user[uKey] : user;
  })();
}
