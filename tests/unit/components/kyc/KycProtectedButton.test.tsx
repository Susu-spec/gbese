import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '../../../setup/test-utils';
import { KycProtectedButton } from '@/features/kyc/components/KycProtectedButton';
import userEvent from '@testing-library/user-event';
import { createMockUser } from '../../../fixtures/users';

describe('KycProtectedButton', () => {
  const mockOnAllowed = vi.fn();

  beforeEach(() => {
    mockOnAllowed.mockClear();
  });

  it('renders button with children', () => {
    render(
      <KycProtectedButton onAllowed={mockOnAllowed}>
        Transfer Debt
      </KycProtectedButton>,
      {
        preloadedState: {
          user: {
            profile: createMockUser({ kyc_status: 'verified' }),
            account: null,
          },
        },
      }
    );

    expect(screen.getByRole('button', { name: /transfer debt/i })).toBeInTheDocument();
  });

  it('calls onAllowed when user is KYC verified', async () => {
    const user = userEvent.setup();

    render(
      <KycProtectedButton onAllowed={mockOnAllowed}>
        Transfer Debt
      </KycProtectedButton>,
      {
        preloadedState: {
          user: {
            profile: createMockUser({ kyc_status: 'verified' }),
            account: null,
          },
        },
      }
    );

    const button = screen.getByRole('button', { name: /transfer debt/i });
    await user.click(button);

    expect(mockOnAllowed).toHaveBeenCalledTimes(1);
  });

  it('shows KYC modal when user is not verified', async () => {
    const user = userEvent.setup();

    render(
      <KycProtectedButton onAllowed={mockOnAllowed}>
        Transfer Debt
      </KycProtectedButton>,
      {
        preloadedState: {
          user: {
            profile: createMockUser({ kyc_status: 'pending' }),
            account: null,
          },
        },
      }
    );

    const button = screen.getByRole('button', { name: /transfer debt/i });
    await user.click(button);

    // Modal should open - use role query to find the modal title specifically
    expect(screen.getByRole('heading', { name: /complete your kyc/i })).toBeInTheDocument();
    expect(mockOnAllowed).not.toHaveBeenCalled();
  });

  it('does not call onAllowed when KYC modal is shown', async () => {
    const user = userEvent.setup();

    render(
      <KycProtectedButton onAllowed={mockOnAllowed}>
        Apply for Loan
      </KycProtectedButton>,
      {
        preloadedState: {
          user: {
            profile: createMockUser({ kyc_status: 'unverified' }),
            account: null,
          },
        },
      }
    );

    const button = screen.getByRole('button', { name: /apply for loan/i });
    await user.click(button);

    expect(mockOnAllowed).not.toHaveBeenCalled();
  });

  it('applies custom className and variant', () => {
    render(
      <KycProtectedButton
        onAllowed={mockOnAllowed}
        className="custom-class"
        variant="destructive"
      >
        Delete
      </KycProtectedButton>,
      {
        preloadedState: {
          user: {
            profile: createMockUser({ kyc_status: 'verified' }),
            account: null,
          },
        },
      }
    );

    const button = screen.getByRole('button', { name: /delete/i });
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass('bg-destructive');
  });

  it('can be disabled', () => {
    render(
      <KycProtectedButton onAllowed={mockOnAllowed} disabled>
        Disabled Action
      </KycProtectedButton>,
      {
        preloadedState: {
          user: {
            profile: createMockUser({ kyc_status: 'verified' }),
            account: null,
          },
        },
      }
    );

    const button = screen.getByRole('button', { name: /disabled action/i });
    expect(button).toBeDisabled();
  });
});
