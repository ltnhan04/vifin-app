import z from "zod";

export const walletSchema = z
  .object({
    symbol: z
      .string()
      .url("Symbol must be a valid URL")
      .regex(
        /\.(jpg|jpeg|png|gif)$/i,
        "Symbol must be an image (jpg, jpeg, png, gif)"
      ),
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
