import z from "zod";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const budgetSchema = z
  .object({
    category_id: z.string().min(1, { message: "Category is required" }),
    wallet_id: z.string().min(1, { message: "Wallet is required" }),
    startDate: z.date(),
    dueDate: z.date(),
    amount: z.number().min(0, { message: "Amount must be at least 0" }),
    repeat_type: z.enum(["monthly", "weekly", "yearly", "custom"]),
    is_repeated: z.boolean().default(true),
    is_completed: z.boolean().default(false),
  })
  .strict()
  .superRefine((data, ctx) => {
    if (data.repeat_type === "custom") {
      if (data.startDate < today) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Start date must be today or in the future for custom repeat type",
          path: ["startDate"],
        });
      }
      if (data.startDate > data.dueDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Start date must be before or equal to due date",
          path: ["dueDate"],
        });
      }
    }
  });

export type BudgetType = z.infer<typeof budgetSchema>;
