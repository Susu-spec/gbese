// ***********************************************
// This file contains custom Cypress commands
// and overloads the Cypress namespace
// ***********************************************

/// <reference types="cypress" />

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Custom command to log in a user
             * @example cy.login('test@example.com', 'password123')
             */
            login(email: string, password: string): Chainable<void>;

            /**
             * Custom command to log in with default test user
             * @example cy.loginAsTestUser()
             */
            loginAsTestUser(): Chainable<void>;

            /**
             * Custom command to clear all cookies and local storage
             * @example cy.clearSession()
             */
            clearSession(): Chainable<void>;

            /**
             * Custom command to seed the database with test data
             * @example cy.seedDatabase()
             */
            seedDatabase(): Chainable<void>;
        }
    }
}

/**
 * Login command - logs in a user with email and password
 */
Cypress.Commands.add('login', (email: string, password: string) => {
    cy.visit('/sign-in');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();

    // Wait for redirect to dashboard
    cy.url().should('include', '/dashboard');
});

/**
 * Login as test user - uses default test credentials
 */
Cypress.Commands.add('loginAsTestUser', () => {
    cy.login('test@example.com', 'password123');
});

/**
 * Clear session - removes all cookies and storage
 */
Cypress.Commands.add('clearSession', () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.clearAllSessionStorage();
});

/**
 * Seed database - calls API to seed test data
 * Note: This assumes you have a seeding endpoint in your backend
 */
Cypress.Commands.add('seedDatabase', () => {
    cy.request('POST', '/api/test/seed');
});

// Prevent TypeScript errors
export { };
