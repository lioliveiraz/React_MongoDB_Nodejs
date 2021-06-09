/// <reference types="cypress" />
const myToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBiYTBlYTZlZWIxYzY1ZTUwZDEyYTE5IiwiYWRtIjpmYWxzZX0sImlhdCI6MTYyMzEzOTQ2MSwiZXhwIjoxNjIzMjI1ODYxfQ.K4_8M-YQAXoSVNCbAGXOJj-TpEZ5Uu_zei9iXTCuNuo";

describe("testing links when user is logged in", () => {
  beforeEach(() => {
    cy.visit("/", {
      onBeforeLoad: function (window) {
        window.localStorage.setItem("token", myToken);
      },
    });
  });

  it("should redirect to the edit-profile page", () => {
    cy.get("[data-cy='navbar']")
      .find("[data-cy='profile-menu-toggle']")
      .click();
    cy.get("[data-cy='profile-menu'").find("[href='/edit-profile']").click();
    cy.location("pathname").should("include", "edit-profile");
  });

  it("should  redirect to the my-wall page", () => {
    cy.get("[data-cy='navbar']")
      .find("[data-cy='profile-menu-toggle']")
      .click();
    cy.get("[data-cy='profile-menu'").find("[href='/my-profile/wall']").click();
    cy.location("pathname").should("include", "my-profile/wall");
  });

  it("should logout", () => {
    cy.get("[data-cy='navbar']").find("[data-cy='logout-icon']").click();
    cy.window().then((win) => {
      expect(win.localStorage.getItem("token")).to.be.null;
    });
    cy.get("[data-cy='navbar']").find("[data-cy='login-button']");
  });
});
