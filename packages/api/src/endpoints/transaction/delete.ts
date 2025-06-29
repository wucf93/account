import z from 'zod'
import { OpenAPIRoute, contentJson } from 'chanfana'
import { PrismaClient } from '@/generated/prisma/'
import { PrismaD1 } from '@prisma/adapter-d1'
import { type AppContext } from '@/types'

export class TransactionDeleteRoute extends OpenAPIRoute {
  schema = {
    tags: ['Transaction'],
    summary: '删除交易记录',
    request: {
      params: z.object({ transactionId: z.number() }),
    },
    responses: {
      200: {
        description: '交易记录删除成功',
        ...contentJson({ success: z.boolean() }),
      },
    },
  }

  async handle({ env, req, get }: AppContext) {
    const adapter = new PrismaD1(env.DB)
    const prisma = new PrismaClient({ adapter })
    const { transactionId } = req.param()
    await prisma.transaction.delete({
      where: { id: Number(transactionId), userId: get('user').id },
    })
    return { success: true }
  }
}
