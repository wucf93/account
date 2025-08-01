import { Bool, OpenAPIRoute, Str } from "chanfana";
import { z } from "zod";
import { TransactionSchema } from "@/generated/zod";
import { getPrismaClient } from "@/lib/prisma";
import { type AppContext } from "../types";

const TransactionUpdateInputSchema = TransactionSchema.pick({
  amount: true,
  transactionType: true,
  transactionDate: true,
  description: true,
  categoryId: true,
}).openapi("TransactionUpdateInput");

export class TransactionUpdate extends OpenAPIRoute {
  schema = {
    tags: ["Transaction"],
    summary: "Update a Transaction",
    request: {
      params: z.object({
        transactionId: Str({ description: "Transaction ID" }).transform((val) =>
          Number(val)
        ),
      }),
      body: {
        content: {
          "application/json": {
            schema: TransactionUpdateInputSchema,
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
      data: await prisma.transaction.update({
        where: { id: data.params.transactionId },
        data: { ...data.body, createUserId: c.var.user?.id! },
      }),
    };
  }
}
