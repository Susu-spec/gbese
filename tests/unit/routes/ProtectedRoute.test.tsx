import { describe, it, expect } from 'vitest';
import { render, screen } from '../../setup/test-utils';
import ProtectedRoute from '@/routes/ProtectedRoute';

describe('ProtectedRoute', () => {
  it('renders children when user is authenticated', () => {
    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>,
      {
        preloadedState: {
          auth: {
            user: { id: 'user-123', full_name: 'Test User' },
            accessToken: 'token',
            refreshToken: 'refresh',
            isAuthenticated: true,
          },
        },
      }
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects to landing when user is not authenticated', () => {
    const { store } = render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>,
      {
        preloadedState: {
          auth: {
            user: null,
            accessToken: '',
            refreshToken: '',
            isAuthenticated: false,
          },
        },
        route: '/dashboard',
      }
    );

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    expect(store.getState().auth.isAuthenticated).toBe(false);
  });

  it('blocks access to protected routes for unauthenticated users', () => {
    render(
      <ProtectedRoute>
        <div>Dashboard</div>
      </ProtectedRoute>,
      {
        preloadedState: {
          auth: {
            user: null,
            accessToken: '',
            refreshToken: '',
            isAuthenticated: false,
          },
        },
      }
    );

    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });
});
