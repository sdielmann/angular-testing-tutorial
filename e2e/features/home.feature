Feature: Home
  As a user of Cypress
  I should be able to use Cucumber
  In order to run my E2E tests

  Scenario: Navigate to todo list
    Given I navigate to "localhost:4200"
    When I click on "Your Todos"
    Then I should be at "/todos"
