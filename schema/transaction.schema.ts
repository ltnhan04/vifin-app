import z from "zod";

export const transactionSchema = z
  .object({
    amount: z.number().gt(0, "Amount must be greater than 0"),
    category_id: z.string().min(1, "Category ID is required"),
    transaction_type: z.enum(["expense", "income"]),
    wallet_id: z.string().min(1, "Wallet ID is required"),
  })
  .strict();

export type TransactionType = z.TypeOf<typeof transactionSchema>;
