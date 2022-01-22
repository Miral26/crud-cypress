import { Post } from "../../../src/models/redux/index";

const testPosts: Record<string, Post> = {
  p1: {
    id: 1,
    title: "this is title 1",
    userId: 1,
    body: "this is body 1",
  },
  p2: {
    id: 2,
    title: "this is title 2",
    userId: 1,
    body: "this is body 2",
  },
};

const checkPostRow = (index: number, post: Post) => {
  cy.get(
    `.MuiTable-root tbody > :nth-child(${index}) > .MuiTableCell-root:nth-child(1)`
  ).should("contain", post.id);
  cy.get(
    `.MuiTable-root tbody > :nth-child(${index}) > .MuiTableCell-root:nth-child(2)`
  ).should("contain", post.title);
  cy.get(
    `.MuiTable-root tbody > :nth-child(${index}) > .MuiTableCell-root:nth-child(3)`
  ).should("contain", post.body);
  cy.get(
    `.MuiTable-root tbody > :nth-child(${index}) > .MuiTableCell-root:nth-child(4) button`
  ).should("have.length", 2);
};

describe("List of Posts", () => {
  beforeEach(() => {
    cy.intercept("GET", "/posts", { fixture: "posts" });
    cy.visit("/");
  });

  it("should check the list of posts", () => {
    cy.get(".MuiToolbar-root > :nth-child(1)").should("contain", "CRUD POST");
    cy.get(".MuiToolbar-root a").should("have.length", 2);
    cy.get(".MuiToolbar-root a").eq(0).should("contain", "Home");
    cy.get(".MuiToolbar-root a")
      .eq(0)
      .should("have.attr", "href")
      .and("contain", "/");
    cy.get(".MuiToolbar-root a").eq(1).should("contain", "Add Post");
    cy.get(".MuiToolbar-root a")
      .eq(1)
      .should("have.attr", "href")
      .and("contain", "/posts/add");
    cy.get(".MuiBox-root h4").should("contain", "Post List");

    cy.get(".MuiTable-root tbody tr").should("have.length", 4);
    checkPostRow(1, testPosts.p1);
    checkPostRow(2, testPosts.p2);
  });

  it("should check the delete", () => {
    cy.intercept("DELETE", "/posts", { body: {} });
    cy.get(
      `.MuiTable-root tbody > :nth-child(1) > .MuiTableCell-root:nth-child(4) button`
    )
      .eq(1)
      .click();
  });
});
