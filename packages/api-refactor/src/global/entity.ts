import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponse<T = any> {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  data?: T;
}

export class ErrorResponse {
  @ApiProperty()
  success: false;

  @ApiProperty()
  code: number;

  @ApiProperty()
  message: string;
}
