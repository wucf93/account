import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import type { getSession } from 'better-auth/api';

export const Public = () => SetMetadata('PUBLIC', true);

export const UserSession = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.session;
  },
);

export const UserId = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.session?.user?.id;
  },
);

export type UserSessionType = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getSession>>>
>;
