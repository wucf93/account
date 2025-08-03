import { z } from "zod";
import { Bool, OpenAPIRoute, Str } from "chanfana";
import { getPrismaClient } from "@/lib/prisma";
import { CategorySchema, TransactionSchema } from "@/generated/zod";
import { getWorkersAIModel } from "@/lib/llm";
import { generateObject } from "ai";
import { dayjs } from "@/lib/day";
import { type AppContext } from "../types";

export class TransactionFetchAI extends OpenAPIRoute {
  schema = {
    tags: ["Transaction"],
    summary: "Fetch a transaction by LLM message",
    request: {
      body: {
        content: {
          "application/json": {
            schema: z
              .object({ message: Str({ description: "LLM message" }) })
              .openapi("TransactionFetchAIRequest"),
          },
        },
      },
    },
    responses: {
      "200": {
        description: "Returns the transaction",
        content: {
          "application/json": {
            schema: z.object({
              success: Bool(),
              data: TransactionSchema.extend({
                category: CategorySchema.openapi("Category"),
              }).openapi("Transaction"),
            }),
          },
        },
      },
    },
  };

  async handle({ env }: AppContext) {
    const data = await this.getValidatedData<typeof this.schema>();
    const { message } = data.body;
    const prisma = getPrismaClient(env);

    // 获取分类数据
    const categories = await prisma.category.findMany();

    // 定义账单信息的schema
    const { object } = await generateObject({
      model: getWorkersAIModel(env),
      prompt:
        `根据以下用户输入识别账单信息："${message}"` +
        `\n请提取交易日期、金额、交易类型(收入/支出)、类别ID和描述。`,
      schema: z.object({
        transactionDate: z
          .string()
          .describe(
            `交易日期，格式YYYY-MM-DD，默认为今天: ${dayjs.tz(dayjs(), "Asia/Shanghai").format("YYYY-MM-DD")}`
          )
          .default(dayjs.tz(dayjs(), "Asia/Shanghai").format("YYYY-MM-DD"))
          .transform((val) => new Date(val).toISOString()),
        amount: z
          .string()
          .describe("交易金额,必须为正数数字,如果是支出则取绝对值"),
        transactionType: z
          .enum(["income", "expenditure"])
          .describe("交易类型，收入(income)或支出(expenditure)"),
        categoryId: z
          .number()
          .describe(
            `交易类别ID，必须是现有分类之一，有效分类ID: ${categories.map((cat) => cat.name + ":" + cat.id).join("; ")}`
          ),
        description: z
          .string()
          .describe("交易描述，简短描述，比如：购买商品")
          .optional(),
      }),
    });

    return {
      success: true,
      data: {
        ...object,
        category: categories.find((cat) => cat.id === object.categoryId),
      },
    };
  }
}
