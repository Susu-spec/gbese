import { http, HttpResponse } from 'msw';

const API_BASE = 'http://localhost:3000'; // Update with your actual API base URL

export const handlers = [
    // Auth endpoints
    http.post(`${API_BASE}/auth/sign-in`, () => {
        return HttpResponse.json({
            success: true,
            data: {
                user: {
                    id: 'user-123',
                    full_name: 'Test User',
                    email: 'test@example.com',
                    phone_number: '+2348012345678',
                },
                accessToken: 'mock-access-token',
                refreshToken: 'mock-refresh-token',
            },
        });
    }),

    http.post(`${API_BASE}/auth/sign-up`, () => {
        return HttpResponse.json({
            success: true,
            data: {
                message: 'User registered successfully',
            },
        });
    }),

    http.post(`${API_BASE}/auth/logout`, () => {
        return HttpResponse.json({
            success: true,
            data: {
                message: 'Logged out successfully',
            },
        });
    }),

    // User endpoints
    http.get(`${API_BASE}/user/profile`, () => {
        return HttpResponse.json({
            success: true,
            data: {
                id: 'user-123',
                full_name: 'Test User',
                email: 'test@example.com',
                phone_number: '+2348012345678',
                kycStatus: 'verified',
            },
        });
    }),

    // Wallet endpoints
    http.get(`${API_BASE}/wallet/balance`, () => {
        return HttpResponse.json({
            success: true,
            data: {
                balance: 50000,
                currency: 'NGN',
            },
        });
    }),

    http.post(`${API_BASE}/wallet/fund`, () => {
        return HttpResponse.json({
            success: true,
            data: {
                message: 'Wallet funded successfully',
                newBalance: 100000,
            },
        });
    }),

    // Transactions
    http.get(`${API_BASE}/account/transactions`, () => {
        return HttpResponse.json({
            success: true,
            data: [
                {
                    id: 'txn-1',
                    type: 'credit',
                    amount: 50000,
                    description: 'Wallet funding',
                    date: '2024-01-15T10:30:00Z',
                    status: 'completed',
                },
                {
                    id: 'txn-2',
                    type: 'debit',
                    amount: 10000,
                    description: 'Bill payment',
                    date: '2024-01-14T15:20:00Z',
                    status: 'completed',
                },
            ],
        });
    }),

    // Credit providers
    http.get(`${API_BASE}/credit/providers`, () => {
        return HttpResponse.json({
            success: true,
            data: [
                {
                    id: 'provider-1',
                    name: 'Quick Loan',
                    interestRate: 5.5,
                    maxAmount: 500000,
                    minAmount: 10000,
                },
                {
                    id: 'provider-2',
                    name: 'Fast Credit',
                    interestRate: 4.8,
                    maxAmount: 1000000,
                    minAmount: 20000,
                },
            ],
        });
    }),
];
