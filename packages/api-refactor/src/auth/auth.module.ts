import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { auth } from './auth.instance';
import { toNodeHandler } from 'better-auth/node';
import { SkipBodyParsingMiddleware } from './auth.middleware';

@Module({})
export class BetterAuthModule implements NestModule {
  constructor(private readonly adapter: HttpAdapterHost) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SkipBodyParsingMiddleware).forRoutes('{*path}');

    this.adapter.httpAdapter.all('/api/auth/{*any}', toNodeHandler(auth));
  }
}
