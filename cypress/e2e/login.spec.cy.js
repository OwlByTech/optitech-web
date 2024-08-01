describe('Login test', async () => {
  it('visit login page', async () => {
    cy.visit(Cypress.env('API_URL'));
    cy.get('input[name="email"]').type('optitech@optitech.com');
    cy.get('input[name="password"]').type('optitech');
    cy.get('button[type="submit"]').click();
  });
});
