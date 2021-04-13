import { Component } from '@angular/core';
import { User } from '@app/models';
import { ApiService } from '../../core/api/api.service';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss']
})
export class UsersViewComponent {

  users: User[];

  readonly currentSort: { key: string; asc: boolean } = {
    key: 'fullName',
    asc: true
  };

  constructor(private api: ApiService) {
    this.api.getUsers().subscribe(next => {
      this.users = next;
      this.sortBy(this.currentSort.key, true);
    });
  }

  sortBy(key: string, asc?: boolean) {
    if (this.users.length < 1) {
      return;
    }

    if (Object.keys(this.users[0]).indexOf(key) < 0) {
      console.warn(`${key} is not a valid sorting key for a user object.`);
      return;
    }

    if (asc === undefined) {
      asc = (key !== this.currentSort.key) ? true : !this.currentSort.asc;
    }

    this.currentSort.asc = asc;
    this.currentSort.key = key;
    const ascVal = this.currentSort.asc ? 1 : -1;
    this.users.sort((a, b) => {
      return (a[this.currentSort.key] > b[this.currentSort.key]) ? ascVal : -ascVal;
    });
  }
}
