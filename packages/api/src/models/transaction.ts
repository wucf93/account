import z from "zod";

const TransactionTypeSchema = z.enum(['income', 'expenditure']);

export const TransactionSchema = z.object({
    transaction_id: z.number().int().positive(),
    user_id: z.number().int().positive(),
    category_id: z.number().int().positive(),
    amount: z.number().nonnegative().max(1000000).min(0),
    transaction_type: TransactionTypeSchema,
    transaction_date: z.number().int().positive(),
    description: z.string().optional().nullable(),
    payee: z.string().optional().nullable(),
    created_at: z.number().int().positive(),
    updated_at: z.number().int().positive()
});