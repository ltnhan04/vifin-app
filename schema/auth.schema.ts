import z from "zod";

export const signInSchema = z
  .object({
    email: z.string().email("Email is not valid!"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must not exceed 100 characters")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must include at least one special character",
      )
      .regex(/[A-Z]/, "Password must be at least one uppercase character"),
  })
  .strict();

export const signUpSchema = z
  .object({
    email: z.string().email("Email is not valid!"),
    password: z
      .string()
      .min(1, "Password must be at least one character")
      .max(100, "Password must not exceed 100 characters")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must include at least one special character",
      )
      .regex(/[A-Z]/, "Password must be at least one uppercase character"),
    confirmPassword: z
      .string()
      .min(1, "Password must be at least one character")
      .max(100, "Password must not exceed 100 characters"),
  })
  .strict()
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Password is not matching!",
        path: ["confirmPassword"],
      });
    }
  });
export type SignUpType = z.TypeOf<typeof signUpSchema>;
export type SignInType = z.TypeOf<typeof signInSchema>;
