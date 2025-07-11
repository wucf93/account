import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { LLMModule } from '@/llm/llm.module';

@Module({
  imports: [LLMModule],
  controllers: [AiController],
  providers: [AiService],
})
export class AiModule {}
