///<reference types="cypress"/>

describe("testing form component", () => {
  it("fields should be required", () => {
    cy.visit("/login");
    cy.get("button").contains("LogIn").click();

    cy.get("p")
      .invoke("text")
      .then((text) => {
        expect(text).to.contains("required");
        expect(text).to.contains("password");
      });
  });

  it("password should be required", () => {
    cy.get('[ data-cy="input-email"] ')
      .type("fake@email.com")
      .should("have.value", "fake@email.com");

    cy.get("button").contains("LogIn").click();

    cy.get("p")
      .invoke("text")
      .then((text) => {
        expect(text).to.contains("required");
        expect(text).to.contains("password");
      });
  });

  it("email should be required", () => {
    cy.get('[ data-cy="input-email"]').clear();
    cy.get('[ data-cy="input-password"]').type("12345678");

    cy.get("button").contains("LogIn").click();

    cy.get("p")
      .invoke("text")
      .then((text) => {
        expect(text).to.contains(" empty");
        expect(text).to.contains("email");
      });
  });

  it("user should not exist", () => {
    cy.get('[ data-cy="input-email"]').type("fake@email.com");

    cy.get("button").contains("LogIn").click();
    cy.get(".Toastify__toast-body").should("contain", "User not found");
  });

  it("user should  exist but password is incorrect", () => {
    cy.get('[ data-cy="input-email"]').clear().type("John@email.com");
    cy.get('[ data-cy="input-password"]').clear().type("incorrect");

    cy.get("button").contains("LogIn").click();
    cy.get(".Toastify__toast-body").should("contain", "Incorrect password");

    cy.location("pathname").should("include", "/login");
  });

  it("user should login and be redirect to the main page", () => {
    cy.get('[ data-cy="input-password"]').clear().type("12345678");

    cy.get("button").contains("LogIn").click();

    cy.location("pathname").should("include", "/");
  });
});
