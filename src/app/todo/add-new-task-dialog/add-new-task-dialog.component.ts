import { Component, Inject } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-add-new-task-dialog',
  templateUrl: './add-new-task-dialog.component.html',
  styleUrls: ['./add-new-task-dialog.component.scss']
})
export class AddNewTaskDialogComponent {

  form = new FormGroup({
    text: new FormControl('', [Validators.required]),
    priority: new FormControl(0, [Validators.required])
  });

  saving = false;

  readonly priorities = [
    { label: 'Normal', value: 0 },
    { label: 'Medium', value: 1 },
    { label: 'High', value: 2 }
  ];

  constructor(
    @Inject(TodoService) private service: TodoService,
    @Inject(DynamicDialogRef) private ref: DynamicDialogRef
  ) {}

  addNewTodo() {
    if (this.form.valid) {
      const formValue = this.form.getRawValue();
      this.saving = true;
      this.service.addNewTodo({
        text: formValue.text,
        done: false,
        createdAt: new Date().toISOString(),
        priority: formValue.priority
      }).subscribe({
        next: (next) => this.ref.close(next),
        error: () => console.error('Failed to create Todo!'),
        complete: () => this.saving = false,
      });
    }
  }

  close() {
    this.ref.close();
  }
}
