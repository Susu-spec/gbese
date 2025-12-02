import { describe, it, expect } from 'vitest';
import debtRequestsReducer, {
  setIncomingDebtRequests,
  clearDebtRequests,
} from '@/features/main/debt-requests/debtRequestsSlice';
import { createMockDebtRequests } from '../../../fixtures/debts';

describe('debtRequestsSlice', () => {
  const initialState = {
    incoming: [],
  };

  describe('setIncomingDebtRequests', () => {
    it('sets incoming debt requests', () => {
      const mockRequests = createMockDebtRequests(3);

      const state = debtRequestsReducer(
        initialState,
        setIncomingDebtRequests(mockRequests)
      );

      expect(state.incoming).toHaveLength(3);
      expect(state.incoming).toEqual(mockRequests);
    });

    it('replaces existing debt requests', () => {
      const oldRequests = createMockDebtRequests(2);
      const existingState = { incoming: oldRequests };

      const newRequests = createMockDebtRequests(5);
      const state = debtRequestsReducer(
        existingState,
        setIncomingDebtRequests(newRequests)
      );

      expect(state.incoming).toHaveLength(5);
      expect(state.incoming).toEqual(newRequests);
    });

    it('handles empty array', () => {
      const state = debtRequestsReducer(
        initialState,
        setIncomingDebtRequests([])
      );

      expect(state.incoming).toEqual([]);
    });
  });

  describe('clearDebtRequests', () => {
    it('clears all incoming debt requests', () => {
      const mockRequests = createMockDebtRequests(4);
      const populatedState = { incoming: mockRequests };

      const state = debtRequestsReducer(populatedState, clearDebtRequests());

      expect(state.incoming).toEqual([]);
    });

    it('handles clearing already empty state', () => {
      const state = debtRequestsReducer(initialState, clearDebtRequests());

      expect(state.incoming).toEqual([]);
    });
  });
});
