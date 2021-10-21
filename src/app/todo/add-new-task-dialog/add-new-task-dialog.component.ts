import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-task-dialog',
  templateUrl: './add-new-task-dialog.component.html',
  styleUrls: ['./add-new-task-dialog.component.scss']
})
export class AddNewTaskDialogComponent {

  form = new FormGroup({
    text: new FormControl('', [Validators.required]),
    dueDate: new FormControl(new Date(), [Validators.required]),
    priority: new FormControl('normal', [Validators.required])
  });

  readonly today = new Date();
  readonly priorities = [
    {label: 'Normal', value: 'normal'},
    {label: 'Medium', value: 'medium'},
    {label: 'High', value: 'high'}
  ];

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {}

  addNewTask() {
    if (this.form.valid) {
      this.ref.close(this.form.getRawValue());
    }
  }
}
