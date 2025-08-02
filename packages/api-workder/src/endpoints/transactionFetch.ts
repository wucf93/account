import { Bool, OpenAPIRoute, Str } from "chanfana";
import { z } from "zod";
import { getPrismaClient } from "@/lib/prisma";
import { type AppContext } from "../types";

export class TransactionFetch extends OpenAPIRoute {
  schema = {
    tags: ["Transaction"],
    summary: "Fetch a Transaction",
    request: {
      params: z.object({
        transactionId: Str({ description: "Transaction ID" }),
      }),
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
    const { transactionId } = data.params;
    const prisma = getPrismaClient(c.env);

    return {
      success: true,
      data: await prisma.transaction.findFirst({
        where: {
          id: Number(transactionId),
          createUserId: c.var.user?.id,
        },
      }),
    };
  }
}
