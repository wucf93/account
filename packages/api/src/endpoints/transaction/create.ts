import z from 'zod'
import { OpenAPIRoute, contentJson } from 'chanfana'
import { PrismaClient } from '@/generated/prisma/'
import { PrismaD1 } from '@prisma/adapter-d1'
import { TransactionModel } from '@/generated/zod'
import dayjs from 'dayjs'
import { type AppContext } from '@/types'

export class TransactionCreateRoute extends OpenAPIRoute {
  schema = {
    tags: ['Transaction'],
    summary: '创建交易记录',
    request: {
      body: contentJson(
        TransactionModel.pick({
          categoryId: true,
          amount: true,
          transactionType: true,
          transactionDate: true,
          description: true,
          payee: true,
        })
      ),
    },
    responses: {
      200: {
        description: '交易记录创建成功',
        ...contentJson({ success: z.boolean() }),
      },
    },
  }

  async handle({ env, req }: AppContext) {
    const adapter = new PrismaD1(env.DB)
    const prisma = new PrismaClient({ adapter })

    const transaction = await req.json()
    await prisma.transaction.create({
      data: {
        ...transaction,
        transactionDate: new Date(transaction.transactionDate),
        userId: 1,
      },
    })
    return { success: true }
  }
}
