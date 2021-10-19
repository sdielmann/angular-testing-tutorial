
export class HomePO {
  static getUserList() {
    return cy.get('.user-list-table');
  }

  static getUserListEntries() {
    return this.getUserList().find('.user-row')
  }
}
