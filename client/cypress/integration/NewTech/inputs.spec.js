/// <reference types="cypress" />
const myToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBiYTBlYTZlZWIxYzY1ZTUwZDEyYTE5IiwiYWRtIjpmYWxzZX0sImlhdCI6MTYyMzEzOTQ2MSwiZXhwIjoxNjIzMjI1ODYxfQ.K4_8M-YQAXoSVNCbAGXOJj-TpEZ5Uu_zei9iXTCuNuo";
describe("Testing signup form inputs", () => {
  it("", () => {
    cy.visit("/newTech", {
      onBeforeLoad: function (window) {
        window.localStorage.setItem("token", myToken);
      },
    });
  });
});
