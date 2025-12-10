import { describe, it, expect } from 'vitest';
import authReducer, { setUser, clearUser } from '@/features/auth/authSlice';
import { createMockUser } from '../../../fixtures/users';

describe('authSlice', () => {
  const initialState = {
    user: null,
    accessToken: '',
    refreshToken: '',
    isAuthenticated: false,
  };

  describe('setUser', () => {
    it('sets user and authentication tokens', () => {
      const mockUser = createMockUser();
      const payload = {
        user: mockUser,
        accessToken: 'test-access-token',
        refreshToken: 'test-refresh-token',
      };

      const state = authReducer(initialState, setUser(payload));

      expect(state.user).toEqual(mockUser);
      expect(state.accessToken).toBe('test-access-token');
      expect(state.refreshToken).toBe('test-refresh-token');
      expect(state.isAuthenticated).toBe(true);
    });

    it('updates existing user session', () => {
      const oldUser = createMockUser({ full_name: 'Old User' });
      const newUser = createMockUser({ full_name: 'New User' });

      const existingState = {
        user: oldUser,
        accessToken: 'old-token',
        refreshToken: 'old-refresh',
        isAuthenticated: true,
      };

      const state = authReducer(
        existingState,
        setUser({
          user: newUser,
          accessToken: 'new-token',
          refreshToken: 'new-refresh',
        })
      );

      expect(state.user?.full_name).toBe('New User');
      expect(state.accessToken).toBe('new-token');
    });
  });

  describe('clearUser', () => {
    it('clears user session and returns to initial state', () => {
      const authenticatedState = {
        user: createMockUser(),
        accessToken: 'test-token',
        refreshToken: 'test-refresh',
        isAuthenticated: true,
      };

      const state = authReducer(authenticatedState, clearUser());

      expect(state.user).toBeNull();
      expect(state.accessToken).toBe('');
      expect(state.refreshToken).toBe('');
      expect(state.isAuthenticated).toBe(false);
    });

    it('does not error when clearing already empty state', () => {
      const state = authReducer(initialState, clearUser());

      expect(state).toEqual(initialState);
    });
  });
});
