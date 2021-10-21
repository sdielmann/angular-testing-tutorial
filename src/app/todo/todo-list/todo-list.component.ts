import { Component, Inject, Input, OnDestroy } from '@angular/core';
import { Todo } from '../model/Todo';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddNewTaskDialogComponent } from '../add-new-task-dialog/add-new-task-dialog.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [DialogService]
})
export class TodoListComponent implements OnDestroy {

  @Input() todos: Todo[] = [
    {
      id: '0',
      createdAt: new Date().toISOString(),
      text: 'Your first Todo',
      done: false
    }
  ];

  private _dialogRef: DynamicDialogRef;

  constructor(@Inject(DialogService) private dialogService: DialogService) { }

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

  ngOnDestroy() {
    if (this._dialogRef) {
      this._dialogRef.close();
    }
  }
}
