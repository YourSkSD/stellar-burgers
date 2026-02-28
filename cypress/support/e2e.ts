import '@testing-library/cypress/add-commands';

beforeEach(() => {
  // Clean state between tests
  cy.clearCookies();
  cy.clearLocalStorage();
});
