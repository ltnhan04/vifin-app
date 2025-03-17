import z from "zod";

export const walletSchema = z
  .object({
    symbol: z.string(),
    amount: z.number(),
    currency_unit: z.enum(["VND", "USD"]),
    wallet_name: z
      .string()
      .min(3, "Wallet name must be at least 3 characters long")
      .max(50, "Wallet name must not exceed 50 characters")
      .trim(),
  })
  .strict();

export type WalletType = z.TypeOf<typeof walletSchema>;
