Feature: Todo List

  Background:
    Given I navigate to "localhost:4200/todos"

  Scenario: Display todo list
    Then my todo list shows 3 tasks

  Scenario: Add a new todo
    When I click on "New"
    Then a dialog to add a new task should pop up
    When I enter the task description "Play with my PS5"
    And I set the task priority to "High"
    And I click on "Add task"
    And I refresh my browser
    Then a task with the description "Play with my PS5" and the priority "High" should be visible

  Scenario: Remove done tasks
    When I have completed the task with the description "Watch Netflix"
    Then the task is marked as done
    And I click on "Clear done tasks"
    Then the task is removed
    And my todo list shows 2 tasks

