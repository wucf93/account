import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { BetterAuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { TransactionModule } from './transaction/transaction.module';
import { GlobalModule } from './global/global.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    BetterAuthModule,
    GlobalModule,
    CategoryModule,
    TransactionModule,
    AiModule,
  ],
})
export class AppModule {}
