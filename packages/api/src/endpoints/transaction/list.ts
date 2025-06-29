import z from 'zod'
import { OpenAPIRoute, contentJson } from 'chanfana'
import { PrismaClient } from '@/generated/prisma/'
import { TransactionModel, CategoryModel } from '@/generated/zod'
import { PrismaD1 } from '@prisma/adapter-d1'
import dayjs from 'dayjs'
import { type AppContext } from '@/types'

export class TransactionListRoute extends OpenAPIRoute {
  schema = {
    tags: ['Transaction'],
    summary: '获取交易列表',
    request: {
      params: z.object({ transactionDate: z.number() }),
    },
    responses: {
      200: {
        description: '获取交易列表',
        ...contentJson({
          success: z.boolean(),
          result: TransactionModel.extend({ category: CategoryModel }).array(),
        }),
      },
    },
  }

  async handle({ env, req }: AppContext) {
    const adapter = new PrismaD1(env.DB)
    const prisma = new PrismaClient({ adapter })
    const transactionDate = dayjs(Number(req.param('transactionDate')))

    return {
      success: true,
      result: await prisma.transaction.findMany({
        where: {
          transactionDate: {
            lte: transactionDate.endOf('month').toDate(),
            gte: transactionDate.startOf('month').toDate(),
          },
        },
        orderBy: {
          transactionDate: 'desc',
        },
        include: {
          category: true,
        },
      }),
    }
  }
}
