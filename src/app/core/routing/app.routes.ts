import { Routes } from '@angular/router';
import { HomeModule } from '../../home/home.module';

export const APP_ROUTES: Routes = [{
  path: '',
  loadChildren: () => HomeModule
}, {
  path: '**',
  pathMatch: 'full',
  redirectTo: '/'
}];
