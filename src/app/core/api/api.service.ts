import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly baseUrl = '/api';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get(`${this.baseUrl}/users`) as Observable<User[]>;
  }
}
