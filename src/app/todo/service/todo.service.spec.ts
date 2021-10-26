import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { ApiService } from '../../core/api/api.service';
import { MockTodo } from '@testing/utils';
import { TestScheduler } from 'rxjs/testing';
import { of } from 'rxjs';
import { Todo } from '@app/models';

jest.mock('../../core/api/api.service');

describe('TodoService', () => {
  let service: TodoService;
  let api: jest.Mocked<ApiService>;
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService]
    });

    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    api = TestBed.inject(ApiService) as jest.Mocked<ApiService>;
    api.getTodos.mockReturnValue(of([]));
    api.addTodo.mockImplementation((todo) => of(todo as Todo));
    api.patchTodo.mockImplementation((id, todo) => of({ id, ...todo } as Todo));

    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load the todo list', (done) => {
    service.loadTodos().subscribe(next => {
      expect(next).toEqual([]);
      done();
    });
  });

  it('should add a new todo and update the observable', (done) => {
    const newTodo = MockTodo.create();

    service.loadTodos().subscribe();
    service.addNewTodo(newTodo).subscribe();

    service.todos$.subscribe(next => {
      expect(next).toEqual([ newTodo ]);
      done();
    });
  });

  it('should set a todo to done', (done) => {
    const todo = MockTodo.create({ id: '123', done: false });
    api.getTodos.mockReturnValue(of([todo]));

    service.loadTodos().subscribe();
    service.setDone('123', true).subscribe();

    service.todos$.subscribe(next => {
      expect(next[0].id).toBe('123');
      expect(next[0].done).toBe(true);
      done();
    });
  });

  it('should remove all done tasks', () => {
    const todo1 = MockTodo.create({ id: '100', done: false });
    const todo2 = MockTodo.create({ id: '101', done: true });
    const todo3 = MockTodo.create({ id: '102', done: true });
    api.getTodos.mockReturnValue(of([todo1, todo2, todo3]));
    api.deleteTodo.mockReturnValue(of(null));

    service.loadTodos().subscribe();
    const spy = jest.spyOn(service, 'loadTodos');

    service.clearDoneTasks().subscribe();

    expect(api.deleteTodo).toHaveBeenCalledTimes(2);
    expect(api.deleteTodo).toHaveBeenCalledWith('101');
    expect(api.deleteTodo).toHaveBeenCalledWith('102');
    expect(spy).toHaveBeenCalled();
  });

  it('should update a todo by its id', (done) => {
    const todo1 = MockTodo.create({ id: '100', done: false });
    const todo2 = MockTodo.create({ id: '101', done: true });
    api.getTodos.mockReturnValue(of([todo1, todo2]));
    service.loadTodos().subscribe();

    service.updateTodoById('101', { done: false, text: 'Hello World' });

    service.todos$.subscribe((next) => {
      expect(next[1].id).toEqual('101');
      expect(next[1].done).toBe(false);
      expect(next[1].text).toBe('Hello World');
      done();
    });
  });
});
