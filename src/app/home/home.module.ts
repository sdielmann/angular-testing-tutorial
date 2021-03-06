import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@app/shared';
import { HomeViewComponent } from './view/home-view.component';

const routes: Routes = [{
  path: '',
  component: HomeViewComponent
}];

@NgModule({
  declarations: [HomeViewComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
