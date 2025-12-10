import { describe, it, expect } from 'vitest';
import { depositAmountSchema, depositFormSchema, DEPOSIT_LIMITS } from '@/features/main/fund-wallet/schemas';

describe('depositAmountSchema', () => {
  describe('KYC verified users', () => {
    const isKycVerified = true;

    it('accepts valid deposit within KYC limit', () => {
      const schema = depositAmountSchema(isKycVerified);
      const result = schema.safeParse(500000);

      expect(result.success).toBe(true);
    });

    it('rejects deposit above KYC limit', () => {
      const schema = depositAmountSchema(isKycVerified);
      const result = schema.safeParse(DEPOSIT_LIMITS.KYC.MAX_PER_DEPOSIT + 1);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Maximum deposit');
      }
    });
  });

  describe('Non-KYC verified users', () => {
    const isKycVerified = false;

    it('accepts valid deposit within non-KYC limit', () => {
      const schema = depositAmountSchema(isKycVerified);
      const result = schema.safeParse(150000);

      expect(result.success).toBe(true);
    });

    it('rejects deposit above non-KYC limit', () => {
      const schema = depositAmountSchema(isKycVerified);
      const result = schema.safeParse(DEPOSIT_LIMITS.NON_KYC.MAX_PER_DEPOSIT + 1);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Non-KYC users');
        expect(result.error.issues[0].message).toContain('Complete KYC');
      }
    });
  });
});

describe('depositFormSchema', () => {
  it('accepts valid form data for KYC user', () => {
    const schema = depositFormSchema(true);
    const result = schema.safeParse({
      amount: 500000,
      payment_method: 'card',
    });

    expect(result.success).toBe(true);
  });

  it('rejects invalid payment method', () => {
    const schema = depositFormSchema(true);
    const result = schema.safeParse({
      amount: 50000,
      payment_method: 'crypto',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('payment method');
    }
  });
});
