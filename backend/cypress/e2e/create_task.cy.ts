// cypress/e2e/create_task.cy.ts

Cypress.on('uncaught:exception', () => false);

describe('Create Task Flow', () => {
  it('should allow user to login and create a new task', () => {
    // Visit the frontend app (update port if needed)
    cy.visit('http://localhost:8081');

    // Fill in the login form
    cy.get('[data-testid="email-input"]').should('be.visible').type('testuser@example.com');
    cy.get('[data-testid="password-input"]').should('be.visible').type('123456');

    // Submit the login form using the login button testID
    cy.get('[data-testid="login-button"]').should('be.visible').click();

    // Wait for tasks screen to load and click the "Add Task" button
    cy.get('[data-testid="add-task-button"]', { timeout: 10000 }).should('be.visible').click();

    // Fill in the new task form
    cy.get('[data-testid="title-input"]').type('Task from Cypress');
    cy.get('[data-testid="description-input"]').type('This task was created during a Cypress E2E test');

    // Submit the task
    cy.get('[data-testid="submit-task-button"]').click();

    // Confirm the task appears
    cy.contains('Task from Cypress').should('exist');
  });
});
