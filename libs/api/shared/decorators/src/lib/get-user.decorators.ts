import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Users } from '@gaming-platform/api/shared/database/entity';

export const GetUser = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);

export const maskedUser = (user: Users): Users => {
  return {
    ...user,
    password: 'xxx',
  } as Users;
};
