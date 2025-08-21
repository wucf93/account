import { z } from "zod";
import { Bool, OpenAPIRoute, Str } from "chanfana";
import { getPrismaClient } from "@/lib/prisma";
import { CategorySchema, TransactionSchema } from "@/generated/zod";
import { getOpenrouterModel } from "@/lib/llm";
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
              .object({ image: Str({ description: "图片地址" }) })
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
                confidence: z
                  .number()
                  .describe(
                    "置信度，0-1之间的数字，置信度越高，识别结果越准确"
                  ),
                category: CategorySchema.openapi("Category"),
              }).openapi("TransactionAI"),
            }),
          },
        },
      },
    },
  };

  async handle({ env }: AppContext) {
    const data = await this.getValidatedData<typeof this.schema>();
    const { image } = data.body;
    const prisma = getPrismaClient(env);

    // 获取分类数据
    const categories = await prisma.category.findMany();

    // 定义账单信息的schema
    const res = await generateObject({
      model: getOpenrouterModel(env)("qwen/qwen2.5-vl-72b-instruct:free"),
      schema: z.object({
        transactionDate: z
          .string()
          .describe(
            `交易日期，格式YYYY-MM-DD HH:mm:ss，默认为今天: ${dayjs.tz(dayjs(), "Asia/Shanghai").format("YYYY-MM-DD HH:mm:ss")}`
          )
          .default(
            dayjs.tz(dayjs(), "Asia/Shanghai").format("YYYY-MM-DD HH:mm:ss")
          )
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
        confidence: z
          .number()
          .describe("置信度，0-1之间的数字，置信度越高，识别结果越准确"),
      }),
      messages: [
        {
          role: "system",
          content: "你是一个账单识别助手",
        },
        {
          role: "user",
          content: [{ type: "image", image: image }],
        },
      ],
    });

    return {
      success: true,
      data: {
        ...res.object,
        category: categories.find((cat) => cat.id === res.object.categoryId),
      },
    };
  }
}
