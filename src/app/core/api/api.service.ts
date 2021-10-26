import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, Todo } from './models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly baseUrl = '/api';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.baseUrl}/todos`);
  }

  addTodo(todo: Partial<Todo>): Observable<Todo> {
    return this.http.post<Todo>(`${this.baseUrl}/todos`, todo);
  }

  deleteTodo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/todos/${id}`);
  }

  patchTodo(id: string, todo: Partial<Todo>): Observable<Todo> {
    return this.http.patch<Todo>(`${this.baseUrl}/todos/${id}`, todo);
  }
}
