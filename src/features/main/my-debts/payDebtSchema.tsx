import { z } from "zod";

export const payDebtSchema = (balance: number, remainingDebt: number) =>
  z.object({
    amount: z.coerce
      .number()
      .min(1, "Amount is required")
      .refine(val => val > 0, "Amount must be greater than 0"),
  })
  .superRefine((data, ctx) => {
    const amount = data.amount;

    if (amount > balance) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Amount cannot exceed your account balance",
        path: ["amount"],
      });
    }

    if (amount > remainingDebt) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Amount cannot be greater than the debt remaining",
        path: ["amount"],
      });
    }
  });
