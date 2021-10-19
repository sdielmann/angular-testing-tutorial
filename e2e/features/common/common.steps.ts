import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given(/^I navigate to "(.*?)"$/, async (url: string) => {
  cy.visit(url);
  //await browser.get(url);
})

When(/^I click on "([^"]*)"$/, async (text: string) => {
  cy.contains(text).click();
});

Then(/^I should be at "(.*?)"$/, async (url: string) => {
  cy.location('pathname').should('eq', url);
});
