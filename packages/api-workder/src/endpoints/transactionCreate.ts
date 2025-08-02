import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { TransactionSchema } from "@/generated/zod";
import { getPrismaClient } from "@/lib/prisma";
import { type AppContext } from "../types";

const TransactionCreateInputSchema = TransactionSchema.pick({
  amount: true,
  transactionType: true,
  transactionDate: true,
  description: true,
  categoryId: true,
}).openapi("TransactionCreateInput");

export class TransactionCreate extends OpenAPIRoute {
  schema = {
    tags: ["Transaction"],
    summary: "Create a new Transaction",
    request: {
      body: {
        content: {
          "application/json": {
            schema: TransactionCreateInputSchema,
          },
        },
      },
    },
    responses: {
      "200": {
        description: "Returns the created transaction",
        content: {
          "application/json": {
            schema: z.object({
              success: Bool(),
            }),
          },
        },
      },
    },
  };

  async handle(c: AppContext) {
    const data = await this.getValidatedData<typeof this.schema>();
    const prisma = getPrismaClient(c.env);

    return {
      success: true,
      data: await prisma.transaction.create({
        data: { ...data.body, createUserId: c.var.user?.id! },
      }),
    };
  }
}
