import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@app/shared';
import { TodoViewComponent } from './todo-view/todo-view.component';
import { ToolbarModule } from 'primeng/toolbar';
import { TodoListComponent } from './todo-list/todo-list.component';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { PaginatorModule } from 'primeng/paginator';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { AddNewTaskDialogComponent } from './add-new-task-dialog/add-new-task-dialog.component';
import { CalendarModule } from 'primeng/calendar';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';

const routes: Routes = [
  {
    path: '',
    component: TodoViewComponent
  }
];

@NgModule({
  declarations: [
    TodoViewComponent,
    TodoListComponent,
    AddNewTaskDialogComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    ToolbarModule,
    CalendarModule,
    CardModule,
    DividerModule,
    SelectButtonModule,
    CheckboxModule,
    InputTextModule,
    DynamicDialogModule
  ]
})
export class TodoModule {}
