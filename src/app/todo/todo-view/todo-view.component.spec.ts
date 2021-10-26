import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoViewComponent } from './todo-view.component';
import { MockComponent } from 'ng-mocks';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { By } from '@angular/platform-browser';

describe('TodoViewComponent', () => {
  let component: TodoViewComponent;
  let fixture: ComponentFixture<TodoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodoViewComponent,
        MockComponent(TodoListComponent)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a todo list', () => {
    expect(fixture.debugElement.query(By.directive(TodoListComponent))).toBeTruthy();
  })
});
