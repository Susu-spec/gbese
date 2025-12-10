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
 * Factory function to create debt request data (matches DebtRequest type)
 */
export const createMockDebtRequest = (overrides = {}) => ({
    id: 'request-123',
    requester_name: 'Requesting User',
    requester_id: 'user-456',
    requester_account_number: '1234567890',
    amount: 30000,
    narration: 'Please accept this debt transfer',
    due_date: '2024-12-31',
    status: 'pending' as const,
    created_at: '2024-01-15T10:00:00Z',
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
            requester_name: `User ${index + 1}`,
            narration: `Debt transfer request ${index + 1}`,
        })
    );
};
