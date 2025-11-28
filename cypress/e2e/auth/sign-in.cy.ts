/// <reference types="cypress" />

describe('Sign In Flow', () => {
    beforeEach(() => {
        // Clear session before each test
        cy.clearSession();
    });

    it('should display sign in form', () => {
        cy.visit('/sign-in');

        // Check form elements exist
        cy.get('input[name="email"]').should('be.visible');
        cy.get('input[name="password"]').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');
    });

    it('should show validation errors for empty fields', () => {
        cy.visit('/sign-in');

        // Try to submit empty form
        cy.get('button[type="submit"]').click();

        // Should show validation errors
        cy.contains(/email is required/i).should('be.visible');
        cy.contains(/password is required/i).should('be.visible');
    });

    it('should show error for invalid email format', () => {
        cy.visit('/sign-in');

        cy.get('input[name="email"]').type('invalid-email');
        cy.get('input[name="password"]').type('password123');
        cy.get('button[type="submit"]').click();

        // Should show email validation error
        cy.contains(/invalid email/i).should('be.visible');
    });

    it('should successfully log in with valid credentials', () => {
        cy.visit('/sign-in');

        // Fill in form
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="password"]').type('password123');

        // Intercept login API call
        cy.intercept('POST', '**/auth/sign-in', {
            statusCode: 200,
            body: {
                success: true,
                data: {
                    user: {
                        id: 'user-123',
                        name: 'Test User',
                        email: 'test@example.com',
                    },
                    accessToken: 'mock-token',
                    refreshToken: 'mock-refresh',
                },
            },
        }).as('loginRequest');

        // Submit form
        cy.get('button[type="submit"]').click();

        // Wait for API call
        cy.wait('@loginRequest');

        // Should redirect to dashboard
        cy.url().should('include', '/dashboard');

        // Should display user name
        cy.contains('Test User').should('be.visible');
    });

    it('should show error message for invalid credentials', () => {
        cy.visit('/sign-in');

        cy.get('input[name="email"]').type('wrong@example.com');
        cy.get('input[name="password"]').type('wrongpassword');

        // Intercept login API call with error
        cy.intercept('POST', '**/auth/sign-in', {
            statusCode: 401,
            body: {
                success: false,
                message: 'Invalid credentials',
            },
        }).as('loginRequest');

        cy.get('button[type="submit"]').click();
        cy.wait('@loginRequest');

        // Should show error message
        cy.contains(/invalid credentials/i).should('be.visible');

        // Should stay on sign in page
        cy.url().should('include', '/sign-in');
    });

    it('should navigate to sign up page', () => {
        cy.visit('/sign-in');

        // Click sign up link
        cy.contains(/sign up/i).click();

        // Should navigate to sign up page
        cy.url().should('include', '/sign-up');
    });

    it('should toggle password visibility', () => {
        cy.visit('/sign-in');

        const passwordInput = cy.get('input[name="password"]');

        // Password should be hidden by default
        passwordInput.should('have.attr', 'type', 'password');

        // Click toggle button
        cy.get('[aria-label="Toggle password visibility"]').click();

        // Password should be visible
        passwordInput.should('have.attr', 'type', 'text');

        // Click toggle again
        cy.get('[aria-label="Toggle password visibility"]').click();

        // Password should be hidden again
        passwordInput.should('have.attr', 'type', 'password');
    });
});
