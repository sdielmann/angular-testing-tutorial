export class TodoPO {

  static readonly dialogSelector = 'app-add-new-task-dialog';
  static readonly taskDescInputSelector = '#task-desc';
  static readonly taskPrioButtonSelector = '#task-prio';
  static readonly checkboxSelector = 'p-checkbox';
  static readonly listSelector = '.todo-list';
  static readonly liSelector = 'li.todo-list__item';
  static readonly liPrioSelector = '.todo-list__item__prio > span';

  static findTaskByDescription(text: string) {
    return cy
      .contains(text)
      .closest(this.liSelector);
  }

  static completeTaskByDescription(text: string) {
    return this.findTaskByDescription(text)
      .find(this.checkboxSelector)
      .click();
  }

  static enterTaskDescription(text: string) {
    cy.wrap(text).as('description');
    return cy.get(this.taskDescInputSelector)
      .type(text);
  }

  static findTodoListItems() {
    return cy
      .get(this.listSelector)
      .find(this.liSelector);
  }

  static getAddTaskDialog() {
    return cy.get(this.dialogSelector);
  }

  static setTaskPriority(priority: string) {
    return cy.get(this.taskPrioButtonSelector)
      .contains(priority)
      .click();
  }
}
