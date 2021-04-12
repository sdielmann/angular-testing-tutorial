import { Component } from '@angular/core';

interface AppLink {
  url: string;
  label: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly links: AppLink[] = [{
    url: '/',
    label: 'Start'
  }, {
    url: '/users',
    label: 'Users'
  }];
}
