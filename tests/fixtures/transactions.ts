/**
 * Factory function to create mock transaction data
 */
export const createMockTransaction = (overrides = {}) => ({
    id: 'txn-123',
    type: 'credit' as const,
    amount: 50000,
    description: 'Test transaction',
    date: '2024-01-15T10:30:00Z',
    status: 'completed' as const,
    currency: 'NGN',
    ...overrides,
});

/**
 * Factory function to create multiple transactions
 */
export const createMockTransactions = (count: number) => {
    return Array.from({ length: count }, (_, index) =>
        createMockTransaction({
            id: `txn-${index + 1}`,
            amount: (index + 1) * 10000,
            description: `Transaction ${index + 1}`,
            type: index % 2 === 0 ? 'credit' : 'debit',
        })
    );
};

/**
 * Factory function to create wallet balance data
 */
export const createMockWalletBalance = (overrides = {}) => ({
    balance: 100000,
    currency: 'NGN',
    lastUpdated: '2024-01-15T10:30:00Z',
    ...overrides,
});
