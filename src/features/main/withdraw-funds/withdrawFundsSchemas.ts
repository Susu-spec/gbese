import z from "zod";

export const withdrawFundsSchema = z.object({
    amount: z.string().min(1, "Amount is required"),
    bankName: z.string().min(1, "Bank name is required"),
    accountNumber: z.string().min(1, "Account number is required").max(10, "Invalid account number"),
    reason: z.string().optional()
})
