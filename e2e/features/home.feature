#features/test.feature
Feature: Running Cucumber with Cypress
  As a user of Cypress
  I should be able to use Cucumber
  In order to run my E2E tests

  Scenario: Cypress with Cucumber Test
    Given I navigate to "localhost:4200"
    When I click on "Users"
    Then I should be at "/users"
