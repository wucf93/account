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
    });

    const content = completion.choices[0].message.content;
    console.log(content);
    const result = { content, json: null };

    if (content) {
      try {
        result.json = JSON.parse(content);
      } catch (error) {
        console.log(content);
        console.log(error);
      }
    }
    return result;
  }
}
