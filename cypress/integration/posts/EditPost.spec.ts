import { Post } from "../../../src/models/redux/index";

const testPosts: Record<string, Post> = {
  p1: {
    id: 3,
    title: "Test Title 1",
    userId: 1,
    body: "Test Body 1",
  },
};

describe("Edit Post", () => {
  beforeEach(() => {
    cy.intercept("GET", "/posts/*", { body: testPosts.p1 });
    cy.intercept("PUT", "/posts/*", { body: testPosts.p1 });
    cy.visit("/posts/edit/3");
  });

  it("should check add post", () => {
    cy.get(".MuiBox-root h4").should("contain", "Update Post");
    cy.get("form input").should("have.length", 2);
    cy.get("form #title").should("have.value", testPosts.p1.title);
    cy.get("form #title")
      .type("11")
      .should("have.value", testPosts.p1.title + "11");
    cy.get("form #body").should("have.value", testPosts.p1.body);
    cy.get("form #body")
      .type("11")
      .should("have.value", testPosts.p1.body + "11");
    cy.get("form button").should("have.length", 2);
    cy.get("form button").eq(0).should("contain", "Update Post");
    cy.get("form button").eq(1).should("contain", "Back To Home");
    cy.get("form button").eq(0).click();
  });
});
