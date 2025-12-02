import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import store, { resetStore } from '@/store/store';
import type { RootState } from '@/store/store';
import { setUser as setAuthUser } from '@/features/auth/authSlice';
import { completeStep1 } from '@/features/kyc/kycSlice';

describe('Redux Store', () => {
  beforeEach(() => {
    // Clean up before each test
    resetStore();
    localStorage.clear();
  });

  afterEach(() => {
    // Clean up after each test
    resetStore();
  });

  describe('store configuration', () => {
    it('has initial state for all slices', () => {
      const state = store.getState();

      expect(state.auth).toBeDefined();
      expect(state.user).toBeDefined();
      expect(state.kyc).toBeDefined();
      expect(state.debtRequests).toBeDefined();
    });

    it('dispatches actions correctly', () => {
      const payload = {
        user: {
          id: '123',
          email: 'test@example.com',
          first_name: 'John',
          last_name: 'Doe',
          phone_number: '1234567890',
          is_kyc_verified: false,
        },
        accessToken: 'token123',
        refreshToken: 'refresh123',
      };

      store.dispatch(setAuthUser(payload));
      const state = store.getState();

      expect(state.auth.user).toEqual(payload.user);
      expect(state.auth.accessToken).toBe('token123');
      expect(state.auth.refreshToken).toBe('refresh123');
      expect(state.auth.isAuthenticated).toBe(true);
    });
  });

  describe('resetStore', () => {
    it('clears all persisted state from localStorage', () => {
      // Set up some state
      const payload = {
        user: {
          id: '123',
          email: 'test@example.com',
          first_name: 'John',
          last_name: 'Doe',
          phone_number: '1234567890',
          is_kyc_verified: false,
        },
        accessToken: 'token123',
        refreshToken: 'refresh123',
      };
      
      store.dispatch(setAuthUser(payload));
      store.dispatch(completeStep1());

      // Reset store
      resetStore();

      // Verify localStorage is cleared
      expect(localStorage.getItem('@@remember-auth')).toBeNull();
      expect(localStorage.getItem('@@remember-user')).toBeNull();
      expect(localStorage.getItem('@@remember-kyc')).toBeNull();
    });

    it('resets Redux state to initial values', () => {
      // Set up some state
      const payload = {
        user: {
          id: '123',
          email: 'test@example.com',
          first_name: 'John',
          last_name: 'Doe',
          phone_number: '1234567890',
          is_kyc_verified: false,
        },
        accessToken: 'token123',
        refreshToken: 'refresh123',
      };
      
      store.dispatch(setAuthUser(payload));
      store.dispatch(completeStep1());

      // Reset store
      resetStore();

      // Verify state is reset
      const state = store.getState();
      expect(state.auth.user).toBeNull();
      expect(state.auth.isAuthenticated).toBe(false);
      expect(state.kyc.currentStep).toBe(1);
    });

    it('allows dispatching actions after reset', () => {
      // Reset store
      resetStore();

      // Dispatch new action
      const newPayload = {
        user: {
          id: '456',
          email: 'new@example.com',
          first_name: 'Jane',
          last_name: 'Smith',
          phone_number: '9876543210',
          is_kyc_verified: true,
        },
        accessToken: 'newtoken',
        refreshToken: 'newrefresh',
      };
      
      store.dispatch(setAuthUser(newPayload));

      // Verify new state
      const state = store.getState();
      expect(state.auth.user).toEqual(newPayload.user);
      expect(state.auth.accessToken).toBe('newtoken');
    });
  });

  describe('rootReducer RESET_STORE action', () => {
    it('resets all slices when RESET_STORE is dispatched', () => {
      // Set up state
      const payload = {
        user: {
          id: '123',
          email: 'test@example.com',
          first_name: 'John',
          last_name: 'Doe',
          phone_number: '1234567890',
          is_kyc_verified: false,
        },
        accessToken: 'token123',
        refreshToken: 'refresh123',
      };

      store.dispatch(setAuthUser(payload));
      store.dispatch(completeStep1());

      // Dispatch RESET_STORE
      store.dispatch({ type: 'RESET_STORE' });

      // Verify all state is reset
      const state = store.getState();
      expect(state.auth.user).toBeNull();
      expect(state.auth.isAuthenticated).toBe(false);
      expect(state.kyc.currentStep).toBe(1);
    });
  });

  describe('TypeScript types', () => {
    it('RootState type matches store state', () => {
      const state: RootState = store.getState();

      expect(state.auth).toBeDefined();
      expect(state.user).toBeDefined();
      expect(state.kyc).toBeDefined();
      expect(state.debtRequests).toBeDefined();
    });
  });
});
