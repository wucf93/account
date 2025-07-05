import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponseDto, PaginatedDto } from '../dto/api-response.dto';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // 如果已经是包装后的响应，直接返回
        if (data && typeof data === 'object' && 'success' in data) {
          return data;
        }

        // 处理分页数据
        if (data && data.items && data.meta) {
          return new PaginatedDto(data.items, data.meta);
        }

        // 默认成功响应
        return new ApiResponseDto(data);
      }),
    );
  }
}
