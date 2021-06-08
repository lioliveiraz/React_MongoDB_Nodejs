/// <reference types="cypress" />

describe("testing navbar Links", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("login button should send to login page", () => {
    cy.get("[data-cy='navbar']").find("[data-cy='login-button']").click();
    cy.location("pathname").should("include", "login");
  });

  it("app name should send to home page ", () => {
    cy.get("[data-cy='navbar']").find("h4").click();
    cy.location("pathname").should("include", "/");
  });

  it("developers  should send to developers page", () => {
    cy.get("[data-cy='navbar']").find("[data-cy='navbar-menu-button']").click();
    cy.get("[data-cy='menu'").find("[href='/developers']").click();

    cy.location("pathname").should("include", "developers");
  });

  it("signup  should send to signup page", () => {
    cy.get("[data-cy='navbar']").find("[data-cy='navbar-menu-button']").click();
    cy.get("[data-cy='menu'").find("[href='/signup']").click();

    cy.location("pathname").should("include", "signup");
  });
});
