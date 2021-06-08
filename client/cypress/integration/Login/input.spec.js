///<reference types="cypress"/>

describe("testing login form", () => {
  it("Testing TextInput field", () => {
    cy.visit("/login");

    cy.get('[ data-cy="input-email"]')
      .type("fake@email.com")
      .should("have.value", "fake@email.com");

    cy.get('[ data-cy="input-email"]')
      .should("have.value", "fake@email.com")
      .clear()
      .should("have.value", "");

    cy.get('[ data-cy="input-password"]')
      .type("12345678")
      .should("have.value", "12345678");

    cy.get('[ data-cy="input-password"]')
      .should("have.value", "12345678")
      .clear()
      .should("have.value", "");
  });

  it("testing labels", () => {
    cy.get("label")
      .parent('[ data-cy="input-email-wrapper"]')
      .invoke("text")
      .then((emailLabel) => {
        expect(emailLabel).to.contain("Email");
      });

    cy.get("label")
      .parent('[ data-cy="input-password-wrapper"]')
      .invoke("text")
      .then((emailLabel) => {
        expect(emailLabel).to.contain("Password");
      });
  });
});
