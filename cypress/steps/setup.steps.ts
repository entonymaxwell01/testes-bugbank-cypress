import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("que acesso a aplicação BugBank", () => {
  cy.visit("/");
});

Then("a página deve ser carregada", () => {
  cy.get("body").should("be.visible");
});
