# Cypress E2E Testing Guide

This directory contains end-to-end tests for the Gbese application using **Cypress**.

## 📁 Folder Structure

```
cypress/
├── e2e/
│   ├── auth/           # Authentication flow tests
│   ├── dashboard/      # Dashboard tests
│   ├── wallet/         # Wallet operation tests
│   ├── debts/          # Debt management tests
│   ├── payments/       # Payment flow tests
│   └── credit/         # Credit options tests
├── fixtures/           # Test data (JSON files)
├── support/
│   ├── commands.ts     # Custom Cypress commands
│   └── e2e.ts         # Global E2E setup
└── downloads/         # Downloaded files during tests
```

---

## 🚀 Running Tests

### Open Cypress UI (Interactive)
```bash
npm run cypress:open
```

### Run all E2E tests (Headless)
```bash
npm run cypress:run
```

### Run specific test file
```bash
npx cypress run --spec "cypress/e2e/auth/sign-in.cy.ts"
```

### Run tests in specific browser
```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
npx cypress run --browser edge
```

### Run tests with video recording
```bash
npx cypress run --video
```

---

## ✍️ Writing E2E Tests

### Basic Test Structure

```typescript
/// <reference types="cypress" />

describe('Feature Name', () => {
  beforeEach(() => {
    // Setup before each test
    cy.clearSession();
    cy.visit('/page-url');
  });

  it('should do something', () => {
    // Test steps
    cy.get('selector').should('be.visible');
    cy.get('button').click();
    cy.url().should('include', '/expected-url');
  });
});
```

### Example: Testing a Form

```typescript
describe('Contact Form', () => {
  it('submits form successfully', () => {
    cy.visit('/contact');
    
    // Fill form
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('john@example.com');
    cy.get('textarea[name="message"]').type('Hello!');
    
    // Submit
    cy.get('button[type="submit"]').click();
    
    // Assert success
    cy.contains('Message sent successfully').should('be.visible');
  });
});
```

### Example: Testing Navigation

```typescript
describe('Navigation', () => {
  it('navigates through main pages', () => {
    cy.visit('/');
    
    cy.contains('Dashboard').click();
    cy.url().should('include', '/dashboard');
    
    cy.contains('My Debts').click();
    cy.url().should('include', '/my-debts');
  });
});
```

---

## 🎭 API Mocking with Intercept

### Mock Successful Response

```typescript
it('loads user data', () => {
  cy.intercept('GET', '**/user/profile', {
    statusCode: 200,
    body: {
      success: true,
      data: {
        id: 'user-123',
        name: 'Test User',
        email: 'test@example.com'
      }
    }
  }).as('getProfile');
  
  cy.visit('/profile');
  cy.wait('@getProfile');
  
  cy.contains('Test User').should('be.visible');
});
```

### Mock Error Response

```typescript
it('handles API error', () => {
  cy.intercept('POST', '**/wallet/fund', {
    statusCode: 500,
    body: {
      success: false,
      message: 'Server error'
    }
  }).as('fundWallet');
  
  cy.visit('/fund-wallet');
  cy.get('button[type="submit"]').click();
  cy.wait('@fundWallet');
  
  cy.contains('Server error').should('be.visible');
});
```

### Mock with Delay

```typescript
it('shows loading state', () => {
  cy.intercept('GET', '**/transactions', (req) => {
    req.reply({
      delay: 2000, // 2 second delay
      statusCode: 200,
      body: { data: [] }
    });
  });
  
  cy.visit('/transactions');
  cy.get('[data-testid="loading"]').should('be.visible');
});
```

---

## 🛠️ Custom Commands

We have custom commands defined in `cypress/support/commands.ts`:

### Login Commands

```typescript
// Login with specific credentials
cy.login('test@example.com', 'password123');

// Login with default test user
cy.loginAsTestUser();
```

### Session Management

```typescript
// Clear all session data
cy.clearSession();
```

### Database Seeding

```typescript
// Seed test data (requires backend endpoint)
cy.seedDatabase();
```

### Creating Your Own Commands

Add to `cypress/support/commands.ts`:

```typescript
Cypress.Commands.add('selectDropdown', (selector: string, value: string) => {
  cy.get(selector).click();
  cy.contains(value).click();
});

// Usage
cy.selectDropdown('[data-testid="country"]', 'Nigeria');
```

---

## 📦 Using Fixtures

### Create Fixture File

`cypress/fixtures/users.json`:
```json
{
  "testUser": {
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  },
  "adminUser": {
    "email": "admin@example.com",
    "password": "admin123",
    "name": "Admin User"
  }
}
```

### Use in Tests

```typescript
it('logs in with fixture data', () => {
  cy.fixture('users').then((users) => {
    cy.visit('/sign-in');
    cy.get('input[name="email"]').type(users.testUser.email);
    cy.get('input[name="password"]').type(users.testUser.password);
    cy.get('button[type="submit"]').click();
  });
});
```

---

## 🎯 Best Practices

### 1. Use Data Attributes for Selectors

❌ **Bad:**
```typescript
cy.get('.btn-primary').click();
```

✅ **Good:**
```typescript
cy.get('[data-testid="submit-button"]').click();
```

### 2. Use Aliases for Repeated Selectors

```typescript
cy.get('input[name="email"]').as('emailInput');
cy.get('@emailInput').type('test@example.com');
cy.get('@emailInput').should('have.value', 'test@example.com');
```

### 3. Wait for API Calls, Not Arbitrary Timeouts

❌ **Bad:**
```typescript
cy.wait(3000);
```

✅ **Good:**
```typescript
cy.intercept('GET', '/api/data').as('getData');
cy.wait('@getData');
```

### 4. Use beforeEach for Setup

```typescript
describe('Dashboard Tests', () => {
  beforeEach(() => {
    cy.loginAsTestUser();
    cy.visit('/dashboard');
  });

  it('test 1', () => { /* ... */ });
  it('test 2', () => { /* ... */ });
});
```

### 5. Test User Flows, Not Individual Components

✅ **Good:** Test complete user journeys
```typescript
it('completes wallet funding flow', () => {
  cy.login();
  cy.visit('/fund-wallet');
  cy.get('input[name="amount"]').type('50000');
  cy.get('button[type="submit"]').click();
  cy.contains('Wallet funded successfully').should('be.visible');
  cy.visit('/dashboard');
  cy.contains('₦50,000').should('be.visible');
});
```

---

## 📸 Screenshots and Videos

### Automatic Screenshots

Cypress automatically takes screenshots on test failures.

Location: `cypress/screenshots/`

### Manual Screenshots

```typescript
it('captures screenshot', () => {
  cy.visit('/dashboard');
  cy.screenshot('dashboard-view');
});
```

### Videos

Videos are recorded by default when running headless.

Location: `cypress/videos/`

Disable videos in `cypress.config.ts`:
```typescript
video: false
```

---

## 🔍 Debugging Tests

### Open Cypress DevTools

When running `npm run cypress:open`, you can:
- Use browser DevTools
- Pause test execution
- Step through commands
- Inspect DOM snapshots

### Debug Command

```typescript
cy.get('button').debug(); // Pauses and opens debugger
```

### Pause Test

```typescript
cy.pause(); // Pauses test execution
```

### Log Values

```typescript
cy.get('input').then(($input) => {
  console.log('Input value:', $input.val());
});
```

---

## 🌐 Testing Different Viewports

### Mobile View

```typescript
it('works on mobile', () => {
  cy.viewport('iphone-x');
  cy.visit('/');
  // Test mobile-specific behavior
});
```

### Tablet View

```typescript
it('works on tablet', () => {
  cy.viewport('ipad-2');
  cy.visit('/');
});
```

### Custom Viewport

```typescript
cy.viewport(1920, 1080);
```

---

## 🔐 Testing Authentication

### Protected Routes

```typescript
describe('Protected Routes', () => {
  it('redirects to login when not authenticated', () => {
    cy.visit('/dashboard');
    cy.url().should('include', '/sign-in');
  });

  it('allows access when authenticated', () => {
    cy.loginAsTestUser();
    cy.visit('/dashboard');
    cy.url().should('include', '/dashboard');
  });
});
```

### Logout Flow

```typescript
it('logs out successfully', () => {
  cy.loginAsTestUser();
  cy.visit('/dashboard');
  
  cy.get('[data-testid="user-menu"]').click();
  cy.contains('Logout').click();
  
  cy.url().should('include', '/sign-in');
});
```

---

## 📊 Test Organization

### Group Related Tests

```typescript
describe('Wallet Operations', () => {
  describe('Funding', () => {
    it('funds with card', () => { /* ... */ });
    it('funds with bank transfer', () => { /* ... */ });
  });

  describe('Withdrawal', () => {
    it('withdraws to bank account', () => { /* ... */ });
    it('handles insufficient balance', () => { /* ... */ });
  });
});
```

---

## 🆘 Common Issues

### Issue: "Timed out retrying"

**Solution:** Increase timeout or wait for specific condition
```typescript
cy.get('selector', { timeout: 10000 }).should('be.visible');
```

### Issue: "Element is detached from the DOM"

**Solution:** Use `.should()` to retry assertions
```typescript
cy.get('button').should('be.visible').click();
```

### Issue: "cy.visit() failed"

**Solution:** Check if dev server is running
```bash
npm run dev  # In another terminal
```

---

## 📚 Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Cypress Examples](https://example.cypress.io/)

---

**Happy Testing! 🎉**
