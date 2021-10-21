import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@app/shared';
import { TodoViewComponent } from './todo-view/todo-view.component';

const routes: Routes = [
  {
    path: '',
    component: TodoViewComponent
  }
];

@NgModule({
  declarations: [
    TodoViewComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class TodoModule {}
