import { describe, it, expect } from 'vitest';
import { mapRawIncomingDebtRequest } from '@/features/main/debt-requests/types';
import type { RawIncomingDebtRequest } from '@/features/main/debt-requests/types';

describe('mapRawIncomingDebtRequest', () => {
  it('maps complete raw debt request correctly', () => {
    const raw: RawIncomingDebtRequest = {
      id: 'req-123',
      sender_id: 'user-456',
      status: 'pending',
      notes: 'Please accept this debt',
      created_at: '2024-01-15T10:00:00Z',
      debt: {
        remaining_balance: '50000.00',
        principal_amount: '60000.00',
        due_date: '2024-12-31',
      },
      sender: {
        first_name: 'John',
        last_name: 'Doe',
      },
    };

    const result = mapRawIncomingDebtRequest(raw);

    expect(result.id).toBe('req-123');
    expect(result.requester_name).toBe('John Doe');
    expect(result.requester_id).toBe('user-456');
    expect(result.amount).toBe(50000);
    expect(result.narration).toBe('Please accept this debt');
    expect(result.due_date).toBe('2024-12-31');
    expect(result.status).toBe('pending');
  });

  it('prefers remaining_balance over principal_amount when positive', () => {
    const raw: RawIncomingDebtRequest = {
      id: 'req-123',
      sender_id: 'user-456',
      status: 'pending',
      notes: null,
      created_at: '2024-01-15T10:00:00Z',
      debt: {
        remaining_balance: '30000.00',
        principal_amount: '50000.00',
      },
    };

    const result = mapRawIncomingDebtRequest(raw);

    expect(result.amount).toBe(30000);
  });

  it('falls back to principal_amount when remaining_balance is zero', () => {
    const raw: RawIncomingDebtRequest = {
      id: 'req-123',
      sender_id: 'user-456',
      status: 'pending',
      notes: null,
      created_at: '2024-01-15T10:00:00Z',
      debt: {
        remaining_balance: '0',
        principal_amount: '50000.00',
      },
    };

    const result = mapRawIncomingDebtRequest(raw);

    expect(result.amount).toBe(50000);
  });

  it('falls back to principal_amount when remaining_balance is negative', () => {
    const raw: RawIncomingDebtRequest = {
      id: 'req-123',
      sender_id: 'user-456',
      status: 'pending',
      notes: null,
      created_at: '2024-01-15T10:00:00Z',
      debt: {
        remaining_balance: '-1000.00',
        principal_amount: '50000.00',
      },
    };

    const result = mapRawIncomingDebtRequest(raw);

    expect(result.amount).toBe(50000);
  });

  it('handles missing debt data gracefully', () => {
    const raw: RawIncomingDebtRequest = {
      id: 'req-123',
      sender_id: 'user-456',
      status: 'pending',
      notes: null,
      created_at: '2024-01-15T10:00:00Z',
      debt: {},
    };

    const result = mapRawIncomingDebtRequest(raw);

    expect(result.amount).toBe(0);
    expect(result.due_date).toBe('');
  });

  it('constructs full name from first and last name', () => {
    const raw: RawIncomingDebtRequest = {
      id: 'req-123',
      sender_id: 'user-456',
      status: 'pending',
      notes: null,
      created_at: '2024-01-15T10:00:00Z',
      debt: {},
      sender: {
        first_name: 'Jane',
        last_name: 'Smith',
      },
    };

    const result = mapRawIncomingDebtRequest(raw);

    expect(result.requester_name).toBe('Jane Smith');
  });

  it('handles missing last name', () => {
    const raw: RawIncomingDebtRequest = {
      id: 'req-123',
      sender_id: 'user-456',
      status: 'pending',
      notes: null,
      created_at: '2024-01-15T10:00:00Z',
      debt: {},
      sender: {
        first_name: 'John',
      },
    };

    const result = mapRawIncomingDebtRequest(raw);

    expect(result.requester_name).toBe('John');
  });

  it('handles missing sender data with "Unknown"', () => {
    const raw: RawIncomingDebtRequest = {
      id: 'req-123',
      sender_id: 'user-456',
      status: 'pending',
      notes: null,
      created_at: '2024-01-15T10:00:00Z',
      debt: {},
    };

    const result = mapRawIncomingDebtRequest(raw);

    expect(result.requester_name).toBe('Unknown');
  });

  it('handles null notes as empty string', () => {
    const raw: RawIncomingDebtRequest = {
      id: 'req-123',
      sender_id: 'user-456',
      status: 'pending',
      notes: null,
      created_at: '2024-01-15T10:00:00Z',
      debt: {},
    };

    const result = mapRawIncomingDebtRequest(raw);

    expect(result.narration).toBe('');
  });

  it('handles empty string notes as empty narration', () => {
    const raw: RawIncomingDebtRequest = {
      id: 'req-123',
      sender_id: 'user-456',
      status: 'pending',
      notes: '   ',
      created_at: '2024-01-15T10:00:00Z',
      debt: {},
    };

    const result = mapRawIncomingDebtRequest(raw);

    expect(result.narration).toBe('');
  });

  it('defaults status to pending if invalid', () => {
    const raw: RawIncomingDebtRequest = {
      id: 'req-123',
      sender_id: 'user-456',
      status: '',
      notes: null,
      created_at: '2024-01-15T10:00:00Z',
      debt: {},
    };

    const result = mapRawIncomingDebtRequest(raw);

    expect(result.status).toBe('pending');
  });
});
