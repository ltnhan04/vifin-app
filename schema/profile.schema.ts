import z from "zod";

export const profileSchema = z
  .object({
    full_name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must not exceed 50 characters"),
    gender: z.enum(["male", "female"]),
  })
  .strict();

export type ProfileType = z.TypeOf<typeof profileSchema>;
