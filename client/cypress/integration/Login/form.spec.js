///<reference types="cypress"/>

// is missing prevent default
describe("", () => {
  it("", () => {
    cy.visit("/login");

    cy.get('[ data-cy="input-email"] [type="email"]')
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

  it("", () => {
    cy.visit("/login");

    cy.get('[ data-cy="input-email"] [type="email"]').clear();
    cy.get('[ data-cy="input-password"]').type("12345678");

    cy.get("button").contains("LogIn").click();

    cy.get("p")
      .invoke("text")
      .then((text) => {
        expect(text).to.contains("required");
        expect(text).to.contains("email");
      });
  });
});
