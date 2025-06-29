import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { PrismaClient } from '@/generated/prisma/'
import { PrismaD1 } from '@prisma/adapter-d1'

export const auth = (env: Env) => {
  const adapter = new PrismaD1(env.DB)
  const prisma = new PrismaClient({ adapter })

  return betterAuth({
    appName: 'Account',
    database: prismaAdapter(prisma, {
      provider: 'sqlite',
    }),
    trustedOrigins: ['http://localhost:5173', 'account-b1e.pages.dev'],
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
  })
}

export type UserType =
  | ReturnType<typeof auth>['$Infer']['Session']['user']
  | null

export type SessionType =
  | ReturnType<typeof auth>['$Infer']['Session']['session']
  | null
