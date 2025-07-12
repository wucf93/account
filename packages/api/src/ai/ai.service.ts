import { Injectable } from '@nestjs/common';
import { GenTransactionDto } from './dto/gen-transaction.dto';
import { LLMService } from '@/llm/llm.service';
import { genTransactionPrompt } from './prompts/gen-transaction.prompts';

@Injectable()
export class AiService {
  constructor(private readonly llmService: LLMService) {}

  async genTransaction(genTransactionDto: GenTransactionDto) {
    const completion = await this.llmService.client.chat.completions.create({
      model: 'hunyuan-turbos-latest',
      messages: [
        { role: 'system', content: genTransactionPrompt },
        { role: 'user', content: genTransactionDto.message },
      ],
      response_format: {
        type: 'json_object',
      },
    });

    const content = completion.choices[0].message.content;
    console.log(content);

    if (content) {
      try {
        return JSON.parse(content) as {
          success: boolean;
          message: string;
          data: any;
        };
      } catch (error) {}
    }

    return {
      success: false,
      message: '解析失败',
      data: null,
    };
  }
}
