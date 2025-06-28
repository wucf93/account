import * as z from "zod"

export const UserModel = z.object({
  id: z.number().int(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
