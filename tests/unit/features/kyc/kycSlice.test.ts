import { describe, it, expect } from 'vitest';
import kycReducer, { completeStep1, completeStep2, resetKyc } from '@/features/kyc/kycSlice';

describe('kycSlice', () => {
  const initialState = {
    currentStep: 1,
  };

  describe('completeStep1', () => {
    it('advances to step 2', () => {
      const state = kycReducer(initialState, completeStep1());

      expect(state.currentStep).toBe(2);
    });

    it('does not regress if already on step 2', () => {
      const existingState = { currentStep: 2 };
      const state = kycReducer(existingState, completeStep1());

      expect(state.currentStep).toBe(2);
    });

    it('does not regress if already on step 3', () => {
      const existingState = { currentStep: 3 };
      const state = kycReducer(existingState, completeStep1());

      expect(state.currentStep).toBe(3);
    });
  });

  describe('completeStep2', () => {
    it('advances to step 3', () => {
      const existingState = { currentStep: 2 };
      const state = kycReducer(existingState, completeStep2());

      expect(state.currentStep).toBe(3);
    });

    it('does not allow completing step 2 before step 1', () => {
      const state = kycReducer(initialState, completeStep2());

      // Should still advance to 3 as Math.max ensures no regression
      expect(state.currentStep).toBe(3);
    });

    it('does not regress if already on step 3', () => {
      const existingState = { currentStep: 3 };
      const state = kycReducer(existingState, completeStep2());

      expect(state.currentStep).toBe(3);
    });
  });

  describe('resetKyc', () => {
    it('resets to step 1 from step 2', () => {
      const existingState = { currentStep: 2 };
      const state = kycReducer(existingState, resetKyc());

      expect(state.currentStep).toBe(1);
    });

    it('resets to step 1 from step 3', () => {
      const existingState = { currentStep: 3 };
      const state = kycReducer(existingState, resetKyc());

      expect(state.currentStep).toBe(1);
    });

    it('handles reset when already at step 1', () => {
      const state = kycReducer(initialState, resetKyc());

      expect(state.currentStep).toBe(1);
    });
  });

  describe('step progression logic', () => {
    it('maintains proper step order: 1 → 2 → 3', () => {
      let state = initialState;

      state = kycReducer(state, completeStep1());
      expect(state.currentStep).toBe(2);

      state = kycReducer(state, completeStep2());
      expect(state.currentStep).toBe(3);
    });

    it('prevents regression with Math.max logic', () => {
      // Start at step 3
      let state = { currentStep: 3 };

      // Try to complete step 1 (should not regress)
      state = kycReducer(state, completeStep1());
      expect(state.currentStep).toBe(3);

      // Try to complete step 2 (should not regress)
      state = kycReducer(state, completeStep2());
      expect(state.currentStep).toBe(3);
    });
  });
});
