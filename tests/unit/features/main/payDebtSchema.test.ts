import { describe, it, expect } from 'vitest';
import { payDebtSchema } from '@/features/main/my-debts/payDebtSchema';

describe('payDebtSchema', () => {
  describe('valid debt payments', () => {
    it('accepts valid payment within balance and debt limits', () => {
      const balance = 100000;
      const remainingDebt = 50000;
      const schema = payDebtSchema(balance, remainingDebt);

      const result = schema.safeParse({ amount: 25000 });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.amount).toBe(25000);
      }
    });

    it('accepts payment equal to remaining debt', () => {
      const balance = 100000;
      const remainingDebt = 50000;
      const schema = payDebtSchema(balance, remainingDebt);

      const result = schema.safeParse({ amount: 50000 });

      expect(result.success).toBe(true);
    });

    it('accepts payment equal to account balance', () => {
      const balance = 30000;
      const remainingDebt = 50000;
      const schema = payDebtSchema(balance, remainingDebt);

      const result = schema.safeParse({ amount: 30000 });

      expect(result.success).toBe(true);
    });
  });

  describe('invalid debt payments', () => {
    it('rejects amount greater than account balance', () => {
      const balance = 20000;
      const remainingDebt = 50000;
      const schema = payDebtSchema(balance, remainingDebt);

      const result = schema.safeParse({ amount: 25000 });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('cannot exceed your account balance');
      }
    });

    it('rejects amount greater than remaining debt', () => {
      const balance = 100000;
      const remainingDebt = 30000;
      const schema = payDebtSchema(balance, remainingDebt);

      const result = schema.safeParse({ amount: 40000 });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('cannot be greater than the debt remaining');
      }
    });

    it('rejects zero amount', () => {
      const balance = 100000;
      const remainingDebt = 50000;
      const schema = payDebtSchema(balance, remainingDebt);

      const result = schema.safeParse({ amount: 0 });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Amount is required');
      }
    });

    it('rejects negative amount', () => {
      const balance = 100000;
      const remainingDebt = 50000;
      const schema = payDebtSchema(balance, remainingDebt);

      const result = schema.safeParse({ amount: -5000 });

      expect(result.success).toBe(false);
    });

    it('rejects missing amount', () => {
      const balance = 100000;
      const remainingDebt = 50000;
      const schema = payDebtSchema(balance, remainingDebt);

      const result = schema.safeParse({});

      expect(result.success).toBe(false);
      if (!result.success) {
        // z.coerce.number() converts missing value to NaN, which fails number validation
        expect(result.error.issues[0].message).toContain('expected number');
      }
    });
  });

  describe('edge cases', () => {
    it('handles payment when balance equals debt', () => {
      const balance = 50000;
      const remainingDebt = 50000;
      const schema = payDebtSchema(balance, remainingDebt);

      const result = schema.safeParse({ amount: 50000 });

      expect(result.success).toBe(true);
    });

    it('rejects payment when balance is zero', () => {
      const balance = 0;
      const remainingDebt = 50000;
      const schema = payDebtSchema(balance, remainingDebt);

      const result = schema.safeParse({ amount: 1000 });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('cannot exceed your account balance');
      }
    });

    it('handles small payments correctly', () => {
      const balance = 100000;
      const remainingDebt = 50000;
      const schema = payDebtSchema(balance, remainingDebt);

      const result = schema.safeParse({ amount: 1 });

      expect(result.success).toBe(true);
    });
  });
});
