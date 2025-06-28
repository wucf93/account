import * as z from "zod"
import { TransactionType } from "../prisma"

export const CategoryModel = z.object({
  id: z.number().int(),
  name: z.string(),
  type: z.nativeEnum(TransactionType),
  icon: z.string(),
  color: z.string(),
  sortOrder: z.number().int(),
})
