///<reference types="cypress"/>

describe("testing login form", () => {
  it("Testing TextInput field", () => {
    cy.visit("/login");

    cy.get('[ data-cy="input-email"] [type="email"]').then((emailInput) => {
      it("should bind with value", () => {
        emailInput
          .type("fake@email.com")
          .should("have.value", "fake@email.com");
      });

      it("should clear input", () => {
        emailInput
          .should("have.value", "fake@email.com")
          .clear()
          .should("have.value", "");
      });
    });

    cy.get('[ data-cy="input-password"] [type="password"]').then(
      (passwordInput) => {
        it("should bind with value", () => {
          passwordInput.type("12345678").should("have.value", "12345678");
        });

        it("should clear input", () => {
          passwordInput
            .should("have.value", "12345678")
            .clear()
            .should("have.value", "");
        });
      }
    );
  });

  it("testing labels", () => {
    cy.get("label")
      .parent('[ data-cy="input-email"]')
      .invoke("text")
      .then((emailLabel) => {
        expect(emailLabel).to.contain("Email");
      });

    cy.get("label")
      .parent('[ data-cy="input-password"]')
      .invoke("text")
      .then((emailLabel) => {
        expect(emailLabel).to.contain("Password");
      });
  });
});
