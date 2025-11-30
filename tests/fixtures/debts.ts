/**
 * Factory function to create mock debt data
 */
export const createMockDebt = (overrides = {}) => ({
    id: 'debt-123',
    creditorId: 'user-456',
    creditorName: 'John Creditor',
    debtorId: 'user-123',
    debtorName: 'Test User',
    amount: 50000,
    currency: 'NGN',
    status: 'active' as const,
    dueDate: '2024-12-31',
    createdAt: '2024-01-01T00:00:00Z',
    description: 'Test debt',
    ...overrides,
});

/**
 * Factory function to create multiple debts
 */
export const createMockDebts = (count: number) => {
    return Array.from({ length: count }, (_, index) =>
        createMockDebt({
            id: `debt-${index + 1}`,
            amount: (index + 1) * 25000,
            creditorName: `Creditor ${index + 1}`,
            description: `Debt ${index + 1}`,
        })
    );
};

/**
 * Factory function to create debt request data
 */
export const createMockDebtRequest = (overrides = {}) => ({
    id: 'request-123',
    fromUserId: 'user-456',
    fromUserName: 'Requesting User',
    toUserId: 'user-123',
    toUserName: 'Test User',
    amount: 30000,
    currency: 'NGN',
    status: 'pending' as const,
    message: 'Please accept this debt transfer',
    createdAt: '2024-01-15T10:00:00Z',
    ...overrides,
});

/**
 * Factory function to create multiple debt requests
 */
export const createMockDebtRequests = (count: number) => {
    return Array.from({ length: count }, (_, index) =>
        createMockDebtRequest({
            id: `request-${index + 1}`,
            amount: (index + 1) * 15000,
            fromUserName: `User ${index + 1}`,
            message: `Debt transfer request ${index + 1}`,
        })
    );
};
