import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { getPrismaClient } from "./prisma";

export const getAuth = (env: Env) => {
  const prisma = getPrismaClient(env);

  return betterAuth({
    database: prismaAdapter(prisma, {
      provider: "sqlite",
    }),
    trustedOrigins: ["http://localhost:5173"],
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
    },
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60,
      },
    },
    // advanced: {
    //   defaultCookieAttributes: {
    //     sameSite: "none",
    //     secure: true,
    //     partitioned: true,
    //   },
    // },
  });
};

export type AuthSession = ReturnType<
  typeof getAuth
>["$Infer"]["Session"]["session"];
export type AuthUser = ReturnType<typeof getAuth>["$Infer"]["Session"]["user"];
