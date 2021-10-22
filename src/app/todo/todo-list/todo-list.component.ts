import { Component, Inject, OnDestroy, OnInit, TrackByFunction } from '@angular/core';
import { Todo } from '@app/models';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddNewTaskDialogComponent } from '../add-new-task-dialog/add-new-task-dialog.component';
import { TodoService } from '../todo.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [DialogService]
})
export class TodoListComponent implements OnInit, OnDestroy {

  todos$: Observable<Todo[]>;
  done$: Observable<Todo[]>;

  clearingDoneTasks = false;

  private _dialogRef: DynamicDialogRef;

  constructor(
    @Inject(TodoService) private todoService: TodoService,
    @Inject(DialogService) private dialogService: DialogService
  ) {
    this.todos$ = todoService.todos$.pipe(map(list => list.filter(todo => !todo.done)));
    this.done$ = todoService.todos$.pipe(map(list => list.filter(todo => todo.done)));
  }

  ngOnInit() {
    this.updateTodos();
  }

  ngOnDestroy() {
    if (this._dialogRef) {
      this._dialogRef.close();
    }
  }

  addNewTask(): void {
    this._dialogRef = this.dialogService.open(AddNewTaskDialogComponent, {
      header: 'Add a new task',
      width: '600px',
      closable: true,
      modal: true,
      closeOnEscape: true
    });

    this._dialogRef.onClose.subscribe(res => console.log(res));
  }

  setDone(id: string, done: boolean) {
    this.todoService.setDone(id, done).subscribe(n => console.log(n));
  }

  updateTodos() {
    this.todoService.loadTodos().subscribe();
  }

  clearDoneTasks() {
    this.clearingDoneTasks = true;
    this.todoService.clearDoneTasks().subscribe({
      complete: () => { this.clearingDoneTasks = false }
    });
  }

  trackById: TrackByFunction<Todo> = (i: number, item: Todo) => item.id;
}
