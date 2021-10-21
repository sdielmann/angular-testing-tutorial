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

const routes: Routes = [
  {
    path: '',
    component: TodoViewComponent
  }
];

@NgModule({
  declarations: [
    TodoViewComponent,
    TodoListComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    ToolbarModule,
    CardModule,
    DividerModule,
    CheckboxModule,
    InputTextModule,
    PaginatorModule
  ]
})
export class TodoModule {}
