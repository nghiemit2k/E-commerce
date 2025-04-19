import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_USER_KEY } from 'src/shared/constants/auth.constant';
import { AccessTokenPayloadCreate } from 'src/shared/types/jwt.type';

export const ActiveUser = createParamDecorator(
  (
    field: keyof AccessTokenPayloadCreate | undefined,
    context: ExecutionContext,
  ) => {
    const request = context.switchToHttp().getRequest();
    const user: AccessTokenPayloadCreate | undefined =
      request[REQUEST_USER_KEY];
    return field ? user?.[field] : user;
  },
);
