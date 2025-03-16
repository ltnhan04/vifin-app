import z from "zod";

export const categorySchema = z
  .object({
    symbol: z.string(),
    transaction_type: z
      .string()
      .transform((val) => val.toLowerCase())
      .refine((val) => ["expense", "income"].includes(val), {
        message: "Transaction type must be 'expense' or 'income'",
      }),
    parent_id: z.string().nullable(),
    createdBy: z.string(),
    name: z
      .string()
      .min(3, "Category must be at least 3 characters long")
      .max(50, "Category must not exceed 50 characters")
      .trim(),
  })
  .strict();

export type CategoryType = z.TypeOf<typeof categorySchema>;
