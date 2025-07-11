import OpenAI from 'openai';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LLMService {
  client = new OpenAI({
    apiKey: process.env['HUNYUAN_LITE_APP_KEY'], // 混元 APIKey
    baseURL: process.env['HUNYUAN_LITE_BASE_URL'], // 混元 endpoint
  });
}
