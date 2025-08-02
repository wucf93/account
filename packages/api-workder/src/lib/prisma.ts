import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "@/generated/prisma/";

export const getPrismaClient = (env: Env) => {
  const adapter = new PrismaD1(env.DB);
  const prisma = new PrismaClient({
    adapter,
  });
  return prisma;
};
