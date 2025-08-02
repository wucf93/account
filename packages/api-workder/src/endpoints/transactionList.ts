import { z } from "zod";
import { Bool, OpenAPIRoute, Str } from "chanfana";
import { getPrismaClient } from "@/lib/prisma";
import { CategorySchema, TransactionSchema } from "@/generated/zod";
import dayjs from "dayjs";
import { type AppContext } from "../types";

export class TransactionList extends OpenAPIRoute {
  schema = {
    tags: ["Transaction"],
    summary: "Fetch a transaction list",
    request: {
      query: z.object({
        transactionDate: Str({ description: "Transaction date" }).transform(
          (val) => dayjs(Number(val))
        ),
      }),
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
              })
                .openapi("Transaction")
                .array(),
            }),
          },
        },
      },
    },
  };

  async handle(c: AppContext) {
    const data = await this.getValidatedData<typeof this.schema>();
    const { transactionDate } = data.query;
    const prisma = getPrismaClient(c.env);

    return {
      success: true,
      data: await prisma.transaction.findMany({
        where: {
          transactionDate: {
            lte: transactionDate.endOf("month").toDate(),
            gte: transactionDate.startOf("month").toDate(),
          },
          createUserId: c.var.user?.id,
        },
        include: {
          category: true,
        },
      }),
    };
  }
}
