import * as z from "zod"
import { TransactionType } from "../prisma"

export const TransactionModel = z.object({
  id: z.number().int(),
  userId: z.number().int(),
  amount: z.number(),
  transactionType: z.nativeEnum(TransactionType),
  transactionDate: z.date(),
  description: z.string().nullish(),
  payee: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  categoryId: z.number().int(),
})
