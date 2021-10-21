import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly menuItems: MenuItem[] = [{
    routerLink: '/',
    label: 'Home',
    icon: 'pi pi-fw pi-home'
  }, {
    routerLink: '/users',
    label: 'Users'
  }, {
    routerLink: '/todos',
    label: 'Your Todos'
  }];
}
