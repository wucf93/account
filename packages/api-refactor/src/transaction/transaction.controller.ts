import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiResponseResult, ApiStringResponse, UserId } from '@/common';
import { TransactionEntity } from './entities/transaction.entity';
import { QueryDataTransactionDto } from './dto/query-transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiStringResponse()
  async create(
    @UserId() userId: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    await this.transactionService.create(userId, createTransactionDto);
    return 'ok';
  }

  @Get()
  @ApiResponseResult({ type: TransactionEntity, isArray: true })
  findAll(@UserId() userId: string, @Query() query: QueryDataTransactionDto) {
    return this.transactionService.findAll(userId, query);
  }

  @Get(':id')
  @ApiResponseResult({ type: TransactionEntity })
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Patch(':id')
  @ApiStringResponse()
  async update(
    @Param('id') id: string,
    @UserId() userId: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    await this.transactionService.update(+id, userId, updateTransactionDto);
    return 'ok';
  }

  @Delete(':id')
  @ApiStringResponse()
  async remove(@Param('id') id: string, @UserId() userId: string) {
    await this.transactionService.remove(+id, userId);
    return 'ok';
  }
}
