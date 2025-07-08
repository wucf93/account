import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { QueryDataTransactionDto } from './dto/query-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as dayjs from 'dayjs';
import { Logger } from '@nestjs/common';

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(TransactionService.name);

  constructor(private prisma: PrismaService) {}

  create(userId: string, createTransactionDto: CreateTransactionDto) {
    return this.prisma.transaction.create({
      data: { ...createTransactionDto, createUserId: userId },
    });
  }

  findAll(userId: string, query: QueryDataTransactionDto) {
    const transactionDate = dayjs(query.transactionDate);

    this.logger.log(
      `查询用户 ${userId} ${transactionDate.format('YYYY-MM')} 的交易记录`,
    );

    return this.prisma.transaction.findMany({
      where: {
        createUserId: userId,
        transactionDate: {
          lte: transactionDate.endOf('month').toDate(),
          gte: transactionDate.startOf('month').toDate(),
        },
      },
      include: {
        category: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.transaction.findFirst({ where: { id } });
  }

  update(
    id: number,
    userId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.prisma.transaction.update({
      data: { ...updateTransactionDto },
      where: { id, createUserId: userId },
    });
  }

  remove(id: number, userId: string) {
    return this.prisma.transaction.delete({
      where: { id, createUserId: userId },
    });
  }
}
