import { Routes } from '@angular/router';
import { HomeModule } from '../../home/home.module';
import { UserModule } from '../../user/user.module';
import { TodoModule } from '../../todo/todo.module';

export const APP_ROUTES: Routes = [{
  path: '',
  loadChildren: () => HomeModule
}, {
  path: 'users',
  loadChildren: () => UserModule
}, {
  path: 'todos',
  loadChildren: () => TodoModule
}];
