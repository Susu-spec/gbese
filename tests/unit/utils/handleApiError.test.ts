import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleApiError } from '@/lib/utils';
import { toast } from 'sonner';

// Mock sonner toast
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe('handleApiError', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays custom message from API response', () => {
    const error = {
      response: {
        status: 400,
        data: {
          message: 'Custom error message from server',
        },
      },
    };

    handleApiError(error);

    expect(toast.error).toHaveBeenCalledWith('Custom error message from server');
  });

  it('handles 401 Unauthorized', () => {
    const error = {
      response: {
        status: 401,
      },
    };

    handleApiError(error);

    expect(toast.error).toHaveBeenCalledWith('Incorrect credentials');
  });

  it('handles 500 Internal Server Error', () => {
    const error = {
      response: {
        status: 500,
      },
    };

    handleApiError(error);

    expect(toast.error).toHaveBeenCalledWith('Server error. Please try again later');
  });

  it('handles unknown status codes', () => {
    const error = {
      response: {
        status: 418,
      },
    };

    handleApiError(error);

    expect(toast.error).toHaveBeenCalledWith('Something went wrong');
  });
});
