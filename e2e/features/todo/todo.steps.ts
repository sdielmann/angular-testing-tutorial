import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import { TodoPO } from './todo.po';

When('I enter the task description {string}', (text: string) => {
  TodoPO.enterTaskDescription(text);
});

When('I set the task priority to {string}', (priority: string) => {
  TodoPO.setTaskPriority(priority);
});

When('I have completed the task with the description {string}', (desc: string) => {
  cy.wrap(desc).as('description');
  TodoPO.completeTaskByDescription(desc);
});

Then('my todo list shows {int} tasks', (count: number) => {
  TodoPO.findTodoListItems().should('have.length', count);
});

Then('a dialog to add a new task should pop up', () => {
  TodoPO.getAddTaskDialog().should('be.visible');
});

Then('a task with the description {string} and the priority {string} should be visible',
  (text: string, priority: string) => {
    TodoPO.findTaskByDescription(text)
      .should('be.visible')
      .find(TodoPO.liPrioSelector)
      .should('have.attr', 'title')
      .and('contain', priority);
  });

Then('the task is marked as done', function () {
  TodoPO.findTaskByDescription(this.description).should('have.class', 'done');
});

Then('the task is removed', function () {
  cy.contains(this.description).should('not.exist');
});
