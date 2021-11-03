import { Component, Inject, OnDestroy, OnInit, TrackByFunction } from '@angular/core';
import { Todo } from '@app/models';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddNewTaskDialogComponent } from '../add-new-task-dialog/add-new-task-dialog.component';
import { TodoService } from '../service/todo.service';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [DialogService]
})
export class TodoListComponent implements OnInit, OnDestroy {

  todos$: Observable<Todo[]>;
  searchForm = new FormControl('');
  clearingDoneTasks = false;

  private _dialogRef: DynamicDialogRef;

  constructor(
    @Inject(TodoService) private todoService: TodoService,
    @Inject(DialogService) private dialogService: DialogService
  ) {
    this.todos$ = combineLatest([
      todoService.todos$.pipe(map(this.sortTodos)),
      this.searchForm.valueChanges.pipe(startWith(''))
    ]).pipe(
      map(([list, searchTerm]) => list.filter(todo => todo.text.toLowerCase().includes(searchTerm.toLowerCase())))
    );
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
      complete: () => { this.clearingDoneTasks = false; }
    });
  }

  trackById: TrackByFunction<Todo> = (i: number, item: Todo) => item.id;

  private sortTodos = (list: Todo[]) => list.slice().sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority > b.priority ? -1 : 1;
    }

    if (a.createdAt !== b.createdAt) {
      return a.createdAt > b.createdAt ? -1 : 1;
    }

    return 0;
  });
}
