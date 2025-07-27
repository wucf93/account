import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { type AppContext, Task } from "../types";
import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "../generated/prisma";

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
              series: z.object({
                success: Bool(),
                result: z.object({
                  tasks: Task.array(),
                }),
              }),
            }),
          },
        },
      },
    },
  };

  async handle({ env }: AppContext) {
    const adapter = new PrismaD1(env.DB);
    const prisma = new PrismaClient({ adapter });

    // Get validated data
    return await prisma.category.findMany();
  }
}
