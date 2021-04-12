import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@app/shared';
import { UsersViewComponent } from './view/users-view.component';

const routes: Routes = [{
  path: '',
  component: UsersViewComponent
}];

@NgModule({
  declarations: [UsersViewComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule { }
