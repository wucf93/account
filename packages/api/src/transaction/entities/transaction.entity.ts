import { ApiProperty } from '@nestjs/swagger';
import { Transaction, TransactionType } from '@prisma/client';
import { CategoryEntity } from 'src/category/entities/category.entity';

export class TransactionEntity implements Omit<Transaction, 'amount'> {
  @ApiProperty({ description: 'id' })
  id: number;

  @ApiProperty({ description: '金额' })
  amount: number;

  @ApiProperty({ description: '用户id' })
  createUserId: string;

  @ApiProperty({ enum: TransactionType, description: '交易类型' })
  transactionType: TransactionType;

  @ApiProperty({ description: '交易日期' })
  transactionDate: Date;

  @ApiProperty({ description: '描述', required: false })
  description: string;

  @ApiProperty({ description: '收款人', required: false })
  payee: string;

  @ApiProperty({ description: '创建时间' })
  createdAt: Date;

  @ApiProperty({ description: '更新时间' })
  updatedAt: Date;

  @ApiProperty({ description: '分类id' })
  categoryId: number;

  @ApiProperty({ description: '分类' })
  category: CategoryEntity;
}
