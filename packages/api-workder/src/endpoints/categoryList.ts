import { OpenAPIRoute, Bool } from "chanfana";
import { z } from "zod";
import { CategorySchema } from "@/generated/zod";
import { getPrismaClient } from "@/lib/prisma";
import { type AppContext } from "@/types";

export class CategoryList extends OpenAPIRoute {
  schema = {
    tags: ["Category"],
    summary: "List Category",
    responses: {
      "200": {
        description: "Returns a list of category",
        content: {
          "application/json": {
            schema: z.object({
              ssuccess: Bool(),
              data: CategorySchema.openapi("Category").array(),
            }),
          },
        },
      },
    },
  };

  async handle({ env }: AppContext) {
    const prisma = getPrismaClient(env);
    return { success: true, data: await prisma.category.findMany() };
  }
}
