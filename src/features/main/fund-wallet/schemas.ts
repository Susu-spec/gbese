import { z } from "zod";

// Deposit limits
const NON_KYC_MAX_PER_DEPOSIT = 200_000; // 200k
const KYC_MAX_PER_DEPOSIT = 1_000_000; // 1M

export const depositAmountSchema = (isKycVerified: boolean) => {
  const maxPerDeposit = isKycVerified ? KYC_MAX_PER_DEPOSIT : NON_KYC_MAX_PER_DEPOSIT;

  return z
    .number({
      message: "Amount must be a number",
    })
    .positive("Amount must be greater than zero")
    .min(100, "Amount must be at least ₦100")
    .max(maxPerDeposit, {
      message: isKycVerified
        ? `Maximum deposit is ₦${maxPerDeposit.toLocaleString()} per transaction`
        : `Non-KYC users can deposit up to ₦${maxPerDeposit.toLocaleString()} per transaction. Complete KYC for higher limits.`,
    });
};

export const depositFormSchema = (isKycVerified: boolean) =>
  z.object({
    amount: depositAmountSchema(isKycVerified),
    payment_method: z.enum(["bank_transfer", "card", "ussd"], {
      message: "Please select a payment method",
    }),
  });

// Export limits for reference in UI
export const DEPOSIT_LIMITS = {
  NON_KYC: {
    MAX_PER_DEPOSIT: NON_KYC_MAX_PER_DEPOSIT
  },
  KYC: {
    MAX_PER_DEPOSIT: KYC_MAX_PER_DEPOSIT
  },
} as const;
