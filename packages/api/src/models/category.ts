import { z } from 'zod';

// 定义分类类型枚举
const CategoryType = z.enum(['income', 'expenditure']);

// 基础分类 Schema
export const CategorySchema = z.object({
    category_id: z.number().int().positive(),
    name: z.string().min(1).max(50).describe("分类名称"),
    type: CategoryType.describe("类型"),
    icon: z.string().regex(/^ri-[a-z-]+-line$/).describe("图标"), // 验证 RemixIcon 格式
    color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).describe("颜色"), // 十六进制颜色验证
    sort_order: z.number().int().nonnegative(),
    created_at: z.number().int().positive().optional(),
    updated_at: z.number().int().positive().optional()
});
