import { ApiProperty } from '@nestjs/swagger';
import { Category, TransactionType } from '@prisma/client';

export class CategoryEntity implements Category {
  @ApiProperty({ description: '分类ID' })
  id: number;

  @ApiProperty({ description: '分类名称' })
  name: string;

  @ApiProperty({
    enumName: 'TransactionType',
    enum: TransactionType,
    description: '交易类型',
  })
  type: TransactionType;

  @ApiProperty({ description: '分类图标' })
  icon: string;

  @ApiProperty({ description: '分类颜色' })
  color: string;

  @ApiProperty({ description: '分类排序' })
  sortOrder: number;
}
