import z from "zod";


export const withdrawFundsSchema = z.object({
    amount: z.string()
        .transform(str => {
            const num = parseInt(str, 10);
            if (isNaN(num)) {
                throw new Error("Amount must be a number");
            }
            return num;
        })
        .refine(num => num > 0, "Amount must be positive"),
    bankName: z.string().min(1, "Bank name is required"),
    bankCode: z.string().min(1, "Bank Code is required"),
    accountNumber: z.string().min(1, "Account number is required").max(10, "Invalid account number"),
    reason: z.string().min(1, "Reason is required")
})
