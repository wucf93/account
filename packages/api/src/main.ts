import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { createSwagger } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // better-auth 错误
    bodyParser: false,
    // 解决跨域问题
    cors: {
      origin: ['http://localhost:5173', 'https://account-b1e.pages.dev'],
      credentials: true,
    },
  });

  // 设置全局路由前缀
  app.setGlobalPrefix('/api');

  // 管道验证
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // swagger
  createSwagger(app);

  await app.listen(process.env.PORT ?? 8787);
}

bootstrap();
