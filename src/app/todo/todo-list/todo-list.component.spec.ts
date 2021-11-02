import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { MockBuilder, MockProvider, MockRender, ngMocks } from 'ng-mocks';
import { TodoModule } from '../todo.module';
import { TodoService } from '../service/todo.service';
import { BehaviorSubject, NEVER, Observable, of } from 'rxjs';
import { Todo } from '@app/models';
import { MockTodo } from '@testing/utils';
import { FromNowPipe } from '../../shared/pipes/from-now.pipe';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todos$: BehaviorSubject<Todo[]>;

  beforeEach(async () => {
    todos$ = new BehaviorSubject([
      MockTodo.create({ id: '100', createdAt: '2021-11-01T10:10:12.000Z' }),
      MockTodo.create({ id: '101', createdAt: '2021-11-01T10:10:11.000Z' }),
      MockTodo.create({ id: '102', createdAt: '2021-11-01T10:10:10.000Z', priority: 2 })
    ]);

    await MockBuilder(TodoListComponent, TodoModule)
      .mock(FromNowPipe, () => 'a minute ago')
      .provide(MockProvider(TodoService, {
        get todos$(): Observable<Todo[]> { return todos$.asObservable(); },
        loadTodos: jest.fn().mockReturnValue(of()),
        setDone: jest.fn().mockReturnValue(of())
      }));

    fixture = MockRender(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(TestBed.inject(TodoService).loadTodos).toHaveBeenCalled();
  });

  it('should sort the task list based on priority and creation time', (done) => {
    const list = todos$.getValue();
    component.todos$.subscribe(sortedList => {
      expect(sortedList[0]).toEqual(list[2]);
      expect(sortedList[1]).toEqual(list[0]);
      expect(sortedList[2]).toEqual(list[1]);
      done();
    });
  });

  it('should display a list of tasks', () => {
    const lItems = fixture.debugElement.$$('.todo-list__item');
    const todos = todos$.getValue();

    // Check list
    expect(lItems.length).toEqual(3);

    // Check list item is rendered correctly
    expect(lItems[0].$('p-checkbox')).toBeTruthy();
    expect(lItems[0].$('.todo-list__item__info__text').nativeElement).toHaveTextContent('Just do it!');
    expect(lItems[0].$('.todo-list__item__info__created-at').nativeElement).toHaveTextContent('a minute ago');

    // Check Checkbox input bindings
    const cb = ngMocks.find(lItems[0], 'p-checkbox');
    expect(cb).toBeTruthy();
    const expectedTodo = todos$.getValue()[2]; // This should be the first item due to sorting
    expect(ngMocks.input(cb, 'binary')).toBe(true);
    expect(ngMocks.input(cb, 'ngModel')).toBe(expectedTodo.done);
    expect(ngMocks.input(cb, 'inputId')).toBe('todo-cb-' + expectedTodo.id);

    // Check Checkbox output bindings
    ngMocks.output(cb, 'ngModelChange').emit(true);
    expect(TestBed.inject(TodoService).setDone).toHaveBeenCalledWith(expectedTodo.id, true);
  });

  it('should add a styling class when a task is done', () => {
    const todos = todos$.getValue().slice();
    todos[2].done = true;
    todos$.next(todos);
    fixture.detectChanges();

    const lItems = fixture.debugElement.$$('.todo-list__item');
    expect(lItems[0].nativeElement).toHaveClass('done');
    expect(lItems[1].nativeElement).not.toHaveClass('done');
    expect(lItems[2].nativeElement).not.toHaveClass('done');
  });

  it('should display a loader when no list is available yet', () => {
    Object.defineProperty(TestBed.inject(TodoService), 'todos$', { get: () => NEVER });
    fixture = MockRender(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(fixture.debugElement.findByQa('todo-list')).toBeFalsy();
    expect(fixture.debugElement.findByQa('loader')).toBeTruthy();
  });

  it('should display a message when the list is empty', () => {
    todos$.next([]);
    fixture.detectChanges();

    expect(fixture.debugElement.findByQa('todo-list')).toBeFalsy();
    expect(fixture.debugElement.findByQa('empty-state')).toBeTruthy();
  });

  xit('should filter the list based on the search term', () => {
    // ToDo: Add a test that tests the search input functionality.
  });
});
