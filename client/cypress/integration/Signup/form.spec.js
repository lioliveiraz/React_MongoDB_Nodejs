/// <reference types="cypress" />
describe("testing signup form", () => {
  it("button should be disabled", () => {
    cy.visit("/signup");
    cy.get("[data-cy='signUp-form'")
      .find('[ data-cy="sign-up-submit-button"]')
      .should("be.disabled");
  });
  it("button should be enable and form should trigger errors messages", () => {
    cy.get('[ data-cy="input-name"]').type("John").should("have.value", "John");
    cy.get('[ data-cy="input-email"]').type("John");
    cy.get('[ data-cy="input-password"]').type("123");
    cy.get("[data-cy='signUp-form'")
      .find('[ data-cy="sign-up-submit-button"]')
      .should("be.enabled");

    cy.get("[data-cy='signUp-form'")
      .find('[ data-cy="sign-up-submit-button"]')
      .click();

    cy.get("p")
      .invoke("text")
      .then((text) => {
        expect(text).to.contains("password");
        expect(text).to.contains("length");
        expect(text).to.contains("email");
        expect(text).to.contains("valid");
      });
  });

  it("form should submit, user should be already registered", () => {
    cy.get('[ data-cy="input-password"]').clear().type("12345678");
    cy.get('[ data-cy="input-email"]').clear().type("John@email.com");

    cy.get("[data-cy='signUp-form'")
      .find('[ data-cy="sign-up-submit-button"]')
      .click();
    cy.location("pathname").should("include", "login");
    cy.get(".Toastify__toast-body").should(
      "contain",
      "You are already registered"
    );
  });
});
