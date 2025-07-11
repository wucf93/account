import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { AiService } from './ai.service';
import { GenTransactionDto } from './dto/gen-transaction.dto';
import { GenTransactionEntity } from './entities/ai.entity';
import { ApiResponseResult } from '@/common';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('/gen/transaction')
  @ApiResponseResult({ type: GenTransactionEntity })
  async genTransaction(@Body() genTransactionDto: GenTransactionDto) {
    const result = await this.aiService.genTransaction(genTransactionDto);

    if (!result.json)
      throw new HttpException(result.content || '解析失败', 500);

    return result.json;
  }
}
