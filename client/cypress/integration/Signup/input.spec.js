/// <reference types="cypress" />

describe("Testing signup form inputs", () => {
  it("should bind data name input", () => {
    cy.visit("/signup");

    cy.get('[ data-cy="input-name"]').type("John").should("have.value", "John");
    cy.get('[ data-cy="input-name"]')
      .should("have.value", "John")
      .clear()
      .should("have.value", "");
  });
  it("should bind data email input", () => {
    cy.get('[ data-cy="input-email"]')
      .type("John@email.com")
      .should("have.value", "John@email.com");
    cy.get('[ data-cy="input-email"]')
      .should("have.value", "John@email.com")
      .clear()
      .should("have.value", "");
  });

  it("should bind data password input", () => {
    cy.get('[ data-cy="input-password"]')
      .type("12345678")
      .should("have.value", "12345678");
    cy.get('[ data-cy="input-password"]')
      .should("have.value", "12345678")
      .clear()
      .should("have.value", "");
  });
});
