import z from "zod";

export const budgetSchema = z
  .object({
    category_id: z.string(),
    wallet_id: z.string(),
    startDate: z.date(),
    dueDate: z.date(),
    amount: z.number().min(0),
    repeatType: z.enum(["monthly", "weekly", "yearly", "custom"]),
    is_repeated: z.boolean().default(true),
    is_completed: z.boolean().default(false),
  })
  .strict();

export type BudgetType = z.TypeOf<typeof budgetSchema>;
