import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given(/^I navigate to "(.*?)"$/, async (url: string) => {
  cy.visit(url);
});

When(/^I click on "([^"]*)"$/, async (text: string) => {
  cy.contains(text).click();
});

When(/^I refresh my browser$/, function () {
  cy.reload();
});

Then(/^I should be at "(.*?)"$/, async (url: string) => {
  cy.location('pathname').should('eq', url);
});
