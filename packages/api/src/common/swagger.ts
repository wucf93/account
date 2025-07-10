import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ApiResponseDto } from './dto/api-response.dto';

export function createSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Account')
    .setDescription('account api')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [ApiResponseDto],
  });

  SwaggerModule.setup('api/docs', app, document, {
    jsonDocumentUrl: '/api/swagger.json',
  });
}
