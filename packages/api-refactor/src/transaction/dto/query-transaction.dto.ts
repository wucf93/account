import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class QueryDataTransactionDto {
  @ApiProperty({ description: '交易日期,时间戳' })
  @IsNumber()
  transactionDate: number;
}
