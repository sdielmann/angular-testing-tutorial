import { Todo, User } from '../../src/app/core/api/models';
import { logger, MockDatabase } from '../util';
import * as faker from 'faker/locale/de';

interface MockBackendData {
  users: User[];
  todos: Todo[];
}

export class Database extends MockDatabase<MockBackendData> {

  protected init() {
    this.db = {
      users: Database.createUsers(),
      todos: Database.createTasks()
    };
  }

  private static createUsers(count = 10): User[] {
    const users = [];

    for (let i = 0; i < count; i++) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const user: User = {
        id: i + '',
        firstName,
        lastName,
        fullName: faker.name.findName(firstName, lastName),
        email: faker.internet.email(firstName, lastName),
        phone: faker.phone.phoneNumberFormat(2),
        age: faker.datatype.number({ min: 18, max: 65, precision: 1 })
      };
      users.push(user);
    }

    logger.info(`Generated ${users.length} users.`);

    return users;
  }

  private static createTasks(count = 3): Todo[] {
    const todos = [];

    for (let i = 0; i < count; i++) {
      const todo: Todo = {
        id: i + '',
        priority: 0,
        done: false,
        text: faker.git.commitMessage(),
        createdAt: faker.date.recent(7).toISOString()
      };
      todos.push(todo);
    }

    logger.info(`Generated ${todos.length} Todos.`);

    return todos;
  }
}
