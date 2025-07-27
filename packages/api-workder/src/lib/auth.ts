import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "../generated/prisma/";

export const auth = (env: Env) => {
  const adapter = new PrismaD1(env.DB);
  const prisma = new PrismaClient({ adapter });

  return betterAuth({
    database: prismaAdapter(prisma, {
      provider: "sqlite",
    }),
    trustedOrigins: ["http://localhost:5173", "https://account-b1e.pages.dev"],
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
    },
    advanced: {
      defaultCookieAttributes: {
        sameSite: "none",
        secure: true,
        partitioned: true,
      },
    },
  });
};
