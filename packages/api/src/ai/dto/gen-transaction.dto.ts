import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GenTransactionDto {
  @ApiProperty({ description: '图片内容' })
  @IsString()
  message: string;
}
