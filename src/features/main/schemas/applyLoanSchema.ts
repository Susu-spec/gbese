import { z } from "zod";

export const applyLoanSchema = z.object({
    amount: z
        .string()
        .min(1, "Amount is required")
        .refine(val => Number(val) > 0, "Amount must be greater than 0"),

    tenureMonths: z
        .string()
        .min(1, "Tenure is required")
        .refine(val => Number(val) > 0, "Tenure must be valid"),

    purpose: z
        .string()
        .min(2, "Purpose is required")
        .max(200, "Purpose is too long"),

    incomeRange: z.string().min(1, "Income range is required"),
    employmentStatus: z.string().min(1, "Employment status is required"),
});
