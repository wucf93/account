import { ApiProperty } from '@nestjs/swagger';

// 成功响应DTO
export class ApiResponseDto<T = any> {
  @ApiProperty({ example: 200, description: '正确码' })
  code: number;

  @ApiProperty({ example: true, description: '请求是否成功' })
  success: boolean;

  @ApiProperty({ description: '返回数据' })
  data: T;

  @ApiProperty({ example: '错误信息', description: '错误描述' })
  message: string;

  constructor(data: T) {
    this.code = 200;
    this.success = true;
    this.data = data;
  }
}

// 分页响应DTO
export class PaginatedDto<T> {
  @ApiProperty({ example: true, description: '请求是否成功' })
  success: boolean;

  @ApiProperty({ description: '分页数据' })
  data: T[];

  @ApiProperty({
    description: '分页元数据',
    example: { total: 100, page: 1, limit: 10, totalPages: 10 },
  })
  meta: { total: number; page: number; limit: number; totalPages: number };

  constructor(data: T[], meta: any) {
    this.success = true;
    this.data = data;
    this.meta = meta;
  }
}

// 错误响应DTO
export class ApiErrorDto {
  @ApiProperty({ example: false, description: '请求是否成功' })
  success: boolean;

  @ApiProperty({ example: 400, description: '错误码' })
  code: number;

  @ApiProperty({ example: '错误信息', description: '错误描述' })
  message: string;

  constructor(code: number, message: string) {
    this.success = false;
    this.code = code;
    this.message = message;
  }
}
