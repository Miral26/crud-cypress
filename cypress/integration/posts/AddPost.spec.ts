import { Post } from "../../../src/models/redux/index";

const testPosts: Record<string, Post> = {
  p1: {
    id: 3,
    title: "Test Title 1",
    userId: 1,
    body: "Test Body 1",
  },
};

describe("Add Post", () => {
  beforeEach(() => {
    cy.intercept("POST", "/posts", { body: testPosts.p1 });
    cy.visit("/posts/add");
  });

  it("should check add post", () => {
    cy.get(".MuiBox-root h4").should("contain", "Add Post");
    cy.get("form input").should("have.length", 2);
    cy.get("form #title")
      .type("Test Title 1")
      .should("have.value", "Test Title 1");
    cy.get("form #body")
      .type("Test Body 1")
      .should("have.value", "Test Body 1");
    cy.get("form button").should("have.length", 2);
    cy.get("form button").eq(0).should("contain", "Save Post");
    cy.get("form button").eq(1).should("contain", "Back To Home");
    cy.get("form button").eq(0).click();
  });
});
