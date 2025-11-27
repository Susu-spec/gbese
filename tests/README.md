# Unit Testing Guide

This directory contains all unit and integration tests for the Gbese application using **Vitest** and **React Testing Library**.

## 📁 Folder Structure

```
tests/
├── unit/
│   ├── components/      # Component tests
│   │   ├── ui/         # UI component tests
│   │   ├── shared/     # Shared component tests
│   │   └── landing/    # Landing page component tests
│   ├── hooks/          # Custom hook tests
│   ├── utils/          # Utility function tests
│   ├── features/       # Feature-specific tests
│   │   ├── auth/      # Auth feature tests
│   │   └── main/      # Main feature tests
│   └── store/         # Redux slice tests
├── setup/
│   ├── test-utils.tsx      # Custom render with providers
│   ├── vitest.setup.ts     # Global test setup
│   └── mocks/
│       ├── handlers.ts     # MSW API handlers
│       └── server.ts       # MSW server setup
└── fixtures/
    ├── users.ts            # User test data factories
    ├── transactions.ts     # Transaction test data factories
    └── debts.ts            # Debt test data factories
```

---

## 🚀 Running Tests

### Run all tests
```bash
npm run test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Run tests with UI
```bash
npm run test:ui
```

### Generate coverage report
```bash
npm run test:coverage
```

### Run specific test file
```bash
npm run test button.test.tsx
```

### Run tests matching a pattern
```bash
npm run test -- --grep "Button"
```

---

## ✍️ Writing Tests

### Component Tests

Use the custom `render` function from `test-utils` which includes all providers:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@/tests/setup/test-utils';
import { MyComponent } from '@/components/MyComponent';
import userEvent from '@testing-library/user-event';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    const user = userEvent.setup();
    render(<MyComponent />);
    
    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Clicked')).toBeInTheDocument();
  });
});
```

### Hook Tests

Use `renderHook` from React Testing Library:

```typescript
import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useMyHook } from '@/hooks/useMyHook';

describe('useMyHook', () => {
  it('returns initial state', () => {
    const { result } = renderHook(() => useMyHook());
    expect(result.current.value).toBe('initial');
  });

  it('updates state', async () => {
    const { result } = renderHook(() => useMyHook());
    
    act(() => {
      result.current.setValue('new value');
    });
    
    await waitFor(() => {
      expect(result.current.value).toBe('new value');
    });
  });
});
```

### Utility Function Tests

Test pure functions directly:

```typescript
import { describe, it, expect } from 'vitest';
import { formatCurrency } from '@/lib/utils';

describe('formatCurrency', () => {
  it('formats NGN currency correctly', () => {
    expect(formatCurrency(50000)).toBe('₦50,000.00');
  });

  it('handles zero', () => {
    expect(formatCurrency(0)).toBe('₦0.00');
  });
});
```

### Redux Slice Tests

Test reducers and actions:

```typescript
import { describe, it, expect } from 'vitest';
import authReducer, { setUser, clearUser } from '@/features/auth/authSlice';

describe('authSlice', () => {
  it('sets user on setUser action', () => {
    const initialState = { user: null, isAuthenticated: false };
    const user = { id: '1', name: 'Test' };
    
    const state = authReducer(initialState, setUser({ user, accessToken: 'token', refreshToken: 'refresh' }));
    
    expect(state.user).toEqual(user);
    expect(state.isAuthenticated).toBe(true);
  });

  it('clears user on clearUser action', () => {
    const state = { user: { id: '1' }, isAuthenticated: true };
    
    const newState = authReducer(state, clearUser());
    
    expect(newState.user).toBeNull();
    expect(newState.isAuthenticated).toBe(false);
  });
});
```

---

## 🏭 Using Test Fixtures

Use factory functions for consistent test data:

```typescript
import { createMockUser, createMockUsers } from '@/tests/fixtures/users';
import { createMockTransaction } from '@/tests/fixtures/transactions';
import { createMockDebt } from '@/tests/fixtures/debts';

// Use default values
const user = createMockUser();

// Override specific fields
const customUser = createMockUser({
  name: 'Custom Name',
  email: 'custom@example.com'
});

// Create multiple items
const users = createMockUsers(5);
```

---

## 🎭 Mocking APIs

API calls are automatically mocked using MSW (Mock Service Worker).

### Using Default Handlers

Default handlers are defined in `tests/setup/mocks/handlers.ts` and work automatically.

### Override Handlers in Tests

```typescript
import { server } from '@/tests/setup/mocks/server';
import { http, HttpResponse } from 'msw';

it('handles API error', async () => {
  // Override handler for this test
  server.use(
    http.get('/api/user/profile', () => {
      return HttpResponse.json(
        { success: false, message: 'Not found' },
        { status: 404 }
      );
    })
  );

  render(<UserProfile />);
  
  await waitFor(() => {
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
```

---

## 🎯 Best Practices

### 1. Test User Behavior, Not Implementation

❌ **Bad:**
```typescript
expect(component.state.count).toBe(1);
```

✅ **Good:**
```typescript
expect(screen.getByText('Count: 1')).toBeInTheDocument();
```

### 2. Use Accessible Queries

Prefer queries that reflect how users interact:

```typescript
// ✅ Good - accessible queries
screen.getByRole('button', { name: /submit/i })
screen.getByLabelText(/email/i)
screen.getByText(/welcome/i)

// ❌ Avoid - implementation details
screen.getByTestId('submit-button')
screen.getByClassName('btn-primary')
```

### 3. Test Edge Cases

```typescript
describe('Input validation', () => {
  it('handles empty input', () => { /* ... */ });
  it('handles very long input', () => { /* ... */ });
  it('handles special characters', () => { /* ... */ });
  it('handles null/undefined', () => { /* ... */ });
});
```

### 4. Keep Tests Isolated

Each test should be independent:

```typescript
beforeEach(() => {
  // Reset state before each test
  localStorage.clear();
  vi.clearAllMocks();
});
```

### 5. Use Descriptive Test Names

```typescript
// ✅ Good
it('displays error message when email is invalid', () => { /* ... */ });

// ❌ Bad
it('test 1', () => { /* ... */ });
```

---

## 📊 Coverage Requirements

Minimum coverage thresholds (80%):
- **Statements:** 80%
- **Branches:** 80%
- **Functions:** 80%
- **Lines:** 80%

View coverage report:
```bash
npm run test:coverage
```

Coverage report will be generated in `coverage/` folder.

---

## 🐛 Debugging Tests

### Run tests in debug mode
```bash
npm run test -- --inspect-brk
```

### Use Vitest UI for debugging
```bash
npm run test:ui
```

### Add debug output
```typescript
import { screen } from '@testing-library/react';

// Print current DOM
screen.debug();

// Print specific element
screen.debug(screen.getByRole('button'));
```

---

## 📚 Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [MSW Documentation](https://mswjs.io/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

## 🆘 Common Issues

### Issue: "Cannot find module '@/...'"

**Solution:** Path aliases are configured in `vitest.config.ts`. Make sure it matches your `tsconfig.json`.

### Issue: "ReferenceError: vi is not defined"

**Solution:** Add `globals: true` to `vitest.config.ts` or import `vi` from 'vitest'.

### Issue: "Element is not accessible"

**Solution:** Use accessible queries like `getByRole`, `getByLabelText` instead of `getByTestId`.

---

**Happy Testing! 🎉**
