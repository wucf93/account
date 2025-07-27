import { z } from "zod";
import { Prisma } from "../prisma";
import Decimal from "decimal.js";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// DECIMAL
//------------------------------------------------------

export const DecimalJsLikeSchema: z.ZodType<Prisma.DecimalJsLike> = z.object({
  d: z.array(z.number()),
  e: z.number(),
  s: z.number(),
  toFixed: z.function(z.tuple([]), z.string()),
});

export const DECIMAL_STRING_REGEX =
  /^(?:-?Infinity|NaN|-?(?:0[bB][01]+(?:\.[01]+)?(?:[pP][-+]?\d+)?|0[oO][0-7]+(?:\.[0-7]+)?(?:[pP][-+]?\d+)?|0[xX][\da-fA-F]+(?:\.[\da-fA-F]+)?(?:[pP][-+]?\d+)?|(?:\d+|\d*\.\d+)(?:[eE][-+]?\d+)?))$/;

export const isValidDecimalInput = (
  v?: null | string | number | Prisma.DecimalJsLike
): v is string | number | Prisma.DecimalJsLike => {
  if (v === undefined || v === null) return false;
  return (
    (typeof v === "object" &&
      "d" in v &&
      "e" in v &&
      "s" in v &&
      "toFixed" in v) ||
    (typeof v === "string" && DECIMAL_STRING_REGEX.test(v)) ||
    typeof v === "number"
  );
};

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(["Serializable"]);

export const CategoryScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "type",
  "icon",
  "sortOrder",
]);

export const TransactionScalarFieldEnumSchema = z.enum([
  "id",
  "amount",
  "transactionType",
  "transactionDate",
  "description",
  "payee",
  "createUserId",
  "createdAt",
  "updatedAt",
  "categoryId",
]);

export const UserScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "email",
  "emailVerified",
  "image",
  "createdAt",
  "updatedAt",
]);

export const SessionScalarFieldEnumSchema = z.enum([
  "id",
  "expiresAt",
  "token",
  "createdAt",
  "updatedAt",
  "ipAddress",
  "userAgent",
  "userId",
]);

export const AccountScalarFieldEnumSchema = z.enum([
  "id",
  "accountId",
  "providerId",
  "userId",
  "accessToken",
  "refreshToken",
  "idToken",
  "accessTokenExpiresAt",
  "refreshTokenExpiresAt",
  "scope",
  "password",
  "createdAt",
  "updatedAt",
]);

export const VerificationScalarFieldEnumSchema = z.enum([
  "id",
  "identifier",
  "value",
  "expiresAt",
  "createdAt",
  "updatedAt",
]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const NullsOrderSchema = z.enum(["first", "last"]);

export const TransactionTypeSchema = z.enum(["income", "expenditure"]);

export type TransactionTypeType = `${z.infer<typeof TransactionTypeSchema>}`;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// CATEGORY SCHEMA
/////////////////////////////////////////

export const CategorySchema = z.object({
  type: TransactionTypeSchema,
  id: z.number().int(),
  name: z.string(),
  icon: z.string(),
  sortOrder: z.number().int(),
});

export type Category = z.infer<typeof CategorySchema>;

/////////////////////////////////////////
// TRANSACTION SCHEMA
/////////////////////////////////////////

export const TransactionSchema = z.object({
  transactionType: TransactionTypeSchema,
  id: z.number().int(),
  amount: z.instanceof(Prisma.Decimal, {
    message:
      "Field 'amount' must be a Decimal. Location: ['Models', 'Transaction']",
  }),
  transactionDate: z.coerce.date(),
  description: z.string().nullable(),
  payee: z.string().nullable(),
  createUserId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  categoryId: z.number().int(),
});

export type Transaction = z.infer<typeof TransactionSchema>;

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type User = z.infer<typeof UserSchema>;

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().nullable(),
  userAgent: z.string().nullable(),
  userId: z.string(),
});

export type Session = z.infer<typeof SessionSchema>;

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  userId: z.string(),
  accessToken: z.string().nullable(),
  refreshToken: z.string().nullable(),
  idToken: z.string().nullable(),
  accessTokenExpiresAt: z.coerce.date().nullable(),
  refreshTokenExpiresAt: z.coerce.date().nullable(),
  scope: z.string().nullable(),
  password: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Account = z.infer<typeof AccountSchema>;

/////////////////////////////////////////
// VERIFICATION SCHEMA
/////////////////////////////////////////

export const VerificationSchema = z.object({
  id: z.string(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().nullable(),
  updatedAt: z.coerce.date().nullable(),
});

export type Verification = z.infer<typeof VerificationSchema>;
