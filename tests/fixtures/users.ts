import type { User } from '../../src/utils/types';

/**
 * Factory function to create mock user data
 * @param overrides - Partial user object to override default values
 */
export const createMockUser = (overrides: Partial<User> = {}): User => ({
    id: 'user-123',
    full_name: 'Test User',
    email: 'test@example.com',
    phone_number: '+2348012345678',
    ...overrides,
});

/**
 * Factory function to create authenticated user with tokens
 */
export const createAuthenticatedUser = (overrides = {}) => ({
    user: createMockUser(),
    accessToken: 'mock-access-token-123',
    refreshToken: 'mock-refresh-token-123',
    ...overrides,
});

/**
 * Factory function to create multiple users
 */
export const createMockUsers = (count: number): User[] => {
    return Array.from({ length: count }, (_, index) =>
        createMockUser({
            id: `user-${index + 1}`,
            full_name: `Test User ${index + 1}`,
            email: `test${index + 1}@example.com`,
        })
    );
};
