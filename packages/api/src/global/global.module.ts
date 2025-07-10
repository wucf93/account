import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';
import { ResponseInterceptor } from 'src/common/filters/http-exception.filter';
import { HttpExceptionFilter } from '@/common/interceptors/http-exception.filter';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class GlobalModule {}
