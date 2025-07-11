import { ApiProperty } from '@nestjs/swagger';
import { Transaction, TransactionType } from '@prisma/client';

export class GenTransactionEntity
  implements
    Pick<Transaction, 'transactionDate' | 'description' | 'transactionType'>
{
  @ApiProperty({ description: '金额' })
  amount: number;

  @ApiProperty({ enum: TransactionType, description: '交易类型' })
  transactionType: TransactionType;

  @ApiProperty({ description: '交易日期' })
  transactionDate: Date;

  @ApiProperty({ description: '描述', required: false })
  description: string;

  @ApiProperty({ description: '分类id' })
  categoryId: number;
}
