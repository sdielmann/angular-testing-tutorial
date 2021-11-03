import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AddNewTaskDialogComponent } from './add-new-task-dialog.component';
import { MockComponent, MockProvider, ngMocks } from 'ng-mocks';
import { SelectButton } from 'primeng/selectbutton';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { TodoService } from '../service/todo.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { of } from 'rxjs';
import { MockTodo } from '@testing/utils';
import { delay } from 'rxjs/operators';

describe('AddNewTaskDialogComponent', () => {
  let component: AddNewTaskDialogComponent;
  let fixture: ComponentFixture<AddNewTaskDialogComponent>;
  let dialogRef: DynamicDialogRef;
  let todoService: TodoService;

  ngMocks.faster();

  beforeAll(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        AddNewTaskDialogComponent,
        MockComponent(SelectButton),
        MockComponent(ButtonDirective),
      ],
      providers: [
        MockProvider(TodoService, {
          addNewTodo: jest.fn().mockReturnValue(of(MockTodo.create()).pipe(delay(100)))
        }),
        MockProvider(DynamicDialogRef, {
          close: jest.fn()
        })
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewTaskDialogComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(DynamicDialogRef);
    todoService = TestBed.inject(TodoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new task', fakeAsync(() => {
    expect(component.form.valid).toBe(false);

    // Enter some task description in the text field
    const inp = fixture.debugElement.findByQa('task-desc-input');
    inp.triggerEventHandler('input', { target: {value: 'Buy some milk' }});

    expect(component.form.get('text').value).toEqual('Buy some milk');
    expect(component.form.valid).toBe(true);

    // Submit the form
    const form = fixture.debugElement.$('form');
    form.triggerEventHandler('submit', null);

    expect(component.saving).toBe(true);
    expect(todoService.addNewTodo).toHaveBeenCalledWith(expect.objectContaining({ text: 'Buy some milk', priority: 0 }));
    tick(100);
    expect(component.saving).toBe(false);
    expect(dialogRef.close).toHaveBeenCalled();
  }));

  it('should have a button that closes the dialog', () => {
    const btn = fixture.debugElement.findByQa('close-btn');
    btn.triggerEventHandler('click', null);
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
