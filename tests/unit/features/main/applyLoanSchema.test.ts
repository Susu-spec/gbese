import { describe, it, expect } from 'vitest';
import { applyLoanSchema } from '@/features/main/schemas/applyLoanSchema';

describe('applyLoanSchema', () => {
  describe('valid loan applications', () => {
    it('accepts valid loan application', () => {
      const result = applyLoanSchema.safeParse({
        amount: '50000',
        tenureMonths: '6',
        purpose: 'Business expansion',
        incomeRange: '100001-250k',
        employmentStatus: 'employed',
      });

      expect(result.success).toBe(true);
    });
  });

  describe('invalid loan applications', () => {
    it('rejects empty amount', () => {
      const result = applyLoanSchema.safeParse({
        amount: '',
        tenureMonths: '6',
        purpose: 'Business',
        incomeRange: '100001-250k',
        employmentStatus: 'employed',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Amount is required');
      }
    });

    it('rejects zero amount', () => {
      const result = applyLoanSchema.safeParse({
        amount: '0',
        tenureMonths: '6',
        purpose: 'Business',
        incomeRange: '100001-250k',
        employmentStatus: 'employed',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('must be greater than 0');
      }
    });

    it('rejects purpose that is too short', () => {
      const result = applyLoanSchema.safeParse({
        amount: '50000',
        tenureMonths: '6',
        purpose: 'A',
        incomeRange: '100001-250k',
        employmentStatus: 'employed',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Purpose is required');
      }
    });

    it('rejects missing employment status', () => {
      const result = applyLoanSchema.safeParse({
        amount: '50000',
        tenureMonths: '6',
        purpose: 'Business',
        incomeRange: '100001-250k',
        employmentStatus: '',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Employment status is required');
      }
    });
  });
});
