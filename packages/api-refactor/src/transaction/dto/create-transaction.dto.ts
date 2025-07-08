import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '@prisma/client';
import { IsDate, IsIn, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({ description: '金额' })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: '交易类型' })
  @IsString()
  @IsIn([TransactionType.income, TransactionType.expenditure])
  transactionType: TransactionType;

  @ApiProperty({ description: '交易日期' })
  @IsDate()
  transactionDate: Date;

  @ApiProperty({ description: '描述', required: false })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ description: '收款方式', required: false })
  @IsOptional()
  @IsString()
  payee: string;

  @ApiProperty({ description: '分类id', required: false })
  @IsOptional()
  @IsNumber()
  categoryId: number;
}
