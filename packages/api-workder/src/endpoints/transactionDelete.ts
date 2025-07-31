import { Bool, OpenAPIRoute, Str } from "chanfana";
import { z } from "zod";
import { getPrismaClient } from "@/lib/prisma";
import { type AppContext } from "../types";

export class TransactionDelete extends OpenAPIRoute {
  schema = {
    tags: ["Transaction"],
    summary: "Delete a Transaction",
    request: {
      params: z.object({
        transactionId: Str({ description: "Transaction ID" }),
      }),
    },
    responses: {
      "200": {
        description: "Returns if the transaction was deleted successfully",
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

    await prisma.transaction.delete({
      where: {
        id: Number(transactionId),
        createUserId: "xxx",
      },
    });

    return {
      success: true,
    };
  }
}
