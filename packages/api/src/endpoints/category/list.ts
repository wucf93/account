import z from 'zod'
import { OpenAPIRoute, contentJson } from 'chanfana'
import { PrismaClient } from '@/generated/prisma/'
import { CategoryModel } from '@/generated/zod'
import { PrismaD1 } from '@prisma/adapter-d1'

export class CategoryListRoute extends OpenAPIRoute {
  schema = {
    tags: ['Category'],
    summary: '分类列表',
    responses: {
      200: {
        description: '分类列表',
        ...contentJson({ success: z.boolean(), result: CategoryModel.array() }),
      },
    },
  }

  async handle({ env }) {
    const adapter = new PrismaD1(env.DB)
    const prisma = new PrismaClient({ adapter })
    return { success: true, result: await prisma.transaction.findMany() }
  }
}
