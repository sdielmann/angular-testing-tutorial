import { Routes } from '@angular/router';
import { HomeModule } from '../../home/home.module';
import { UserModule } from '../../user/user.module';

export const APP_ROUTES: Routes = [{
  path: '',
  loadChildren: () => HomeModule
}, {
  path: 'users',
  loadChildren: () => UserModule
}];
