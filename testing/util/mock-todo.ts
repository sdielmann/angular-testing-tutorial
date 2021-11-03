import { Todo } from '@app/models';

export class MockTodo {
  static create(override?: Partial<Todo>): Todo {
    return {
      id: '1000',
      createdAt: new Date().toISOString(),
      done: false,
      text: 'Just do it!',
      priority: 0,
      ...override
    };
  }
}
