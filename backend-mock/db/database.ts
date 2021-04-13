import { User } from '../../src/app/core/api/models';
import { logger, MockDatabase, MockDatabaseObject } from '../util';
import * as faker from 'faker/locale/de';

interface MockUser extends MockDatabaseObject, User {}

interface MockBackendData {
  users: MockUser[];
}

export class Database extends MockDatabase<MockBackendData>{

  protected init() {
    this.db = {
      users: Database.createUsers()
    };
  }

  private static createUsers(count = 10): MockUser[] {
    const users = [];

    for (let i = 0; i < count; i++) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const user: MockUser = {
        _id: i,
        firstName,
        lastName,
        fullName: faker.name.findName(firstName, lastName),
        email: faker.internet.email(firstName, lastName),
        phone: faker.phone.phoneNumberFormat(2),
        age: faker.random.number( { min: 18, max: 65, precision: 1 })
      };
      users.push(user);
    }

    logger.info(`Generated ${users.length} users.`)

    return users;
  }
}
