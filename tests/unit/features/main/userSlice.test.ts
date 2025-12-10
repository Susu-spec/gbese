import { describe, it, expect } from 'vitest';
import userReducer, { setUser, setAccount, clearUser } from '@/features/main/dashboard/userSlice';
import { createMockUser } from '../../../fixtures/users';
import type { AccountData } from '@/features/main/dashboard/types';

describe('userSlice', () => {
  const initialState = {
    profile: {
      id: '',
      email: '',
      full_name: '',
      kyc_status: '',
      twoFactorRequired: false,
      verificationRequired: true,
      verificationMethods: [''],
      first_name: '',
      last_name: '',
      phone_number: '',
      reputation_score: '',
      account_status: '',
      two_factor_enabled: false,
      created_at: '',
      last_login: '',
      address: '',
      city: '',
      state: '',
      country: '',
      postal_code: '',
      date_of_birth: '',
      occupation: '',
    },
    account: null,
  };

  describe('setUser', () => {
    it('sets user profile data', () => {
      const mockUser = createMockUser({
        full_name: 'Test User',
        email: 'test@gbese.com',
        kyc_status: 'verified',
      });

      const state = userReducer(initialState, setUser(mockUser));

      expect(state.profile).toEqual(mockUser);
      expect(state.profile.kyc_status).toBe('verified');
    });

    it('updates existing user profile', () => {
      const oldUser = createMockUser({ kyc_status: 'pending' });
      const existingState = { ...initialState, profile: oldUser };
      
      const updatedUser = createMockUser({ kyc_status: 'verified' });
      const state = userReducer(existingState, setUser(updatedUser));

      expect(state.profile.kyc_status).toBe('verified');
    });
  });

  describe('setAccount', () => {
    it('sets account data', () => {
      const mockAccount: AccountData = {
        account_number: '1234567890',
        current_balance: '50000.00',
        total_debt_obligation: '10000.00',
        available_credit: 100000,
      };

      const state = userReducer(initialState, setAccount(mockAccount));

      expect(state.account).toEqual(mockAccount);
      expect(state.account?.current_balance).toBe('50000.00');
    });

    it('updates existing account data', () => {
      const oldAccount: AccountData = {
        account_number: '1234567890',
        current_balance: '50000.00',
        total_debt_obligation: '10000.00',
        available_credit: 100000,
      };

      const existingState = { ...initialState, account: oldAccount };

      const newAccount: AccountData = {
        ...oldAccount,
        current_balance: '75000.00',
      };

      const state = userReducer(existingState, setAccount(newAccount));

      expect(state.account?.current_balance).toBe('75000.00');
    });
  });

  describe('clearUser', () => {
    it('resets user and account to initial state', () => {
      const mockUser = createMockUser();
      const mockAccount: AccountData = {
        account_number: '1234567890',
        current_balance: '50000.00',
        total_debt_obligation: '10000.00',
        available_credit: 100000,
      };

      const populatedState = {
        profile: mockUser,
        account: mockAccount,
      };

      const state = userReducer(populatedState, clearUser());

      expect(state.profile.id).toBe('');
      expect(state.account).toBeNull();
    });
  });
});
