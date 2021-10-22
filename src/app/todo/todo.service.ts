import { Inject, Injectable } from '@angular/core';
import { ApiService } from '../core/api/api.service';
import { Todo } from '@app/models';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  get todos$(): Observable<Todo[]> {
    return this.todos.asObservable().pipe(
      filter(list => Array.isArray(list)),
      map(this.sortTodos)
    );
  }

  private todos = new BehaviorSubject<Todo[]>(null);

  constructor(@Inject(ApiService) private api: ApiService) { }

  loadTodos(): Observable<Todo[]> {
    return this.api.getTodos().pipe(
      catchError(() => of([])),
      tap((next) => this.todos.next(next))
    );
  }

  setDone(id: string, done: boolean) {
    // Optimistically update the To-Do instead of waiting for the request
    this.updateTodoById(id, { done });
    return this.api.patchTodo(id, { done }).pipe(
      tap(next => { this.updateTodoById(id, next); })
    );
  }

  addNewTodo(todo: Todo): Observable<any> {
    return this.api.addTodo(todo).pipe(
      tap(newTodo => {
        const todos = this.todos.getValue();
        todos.push(newTodo);
        this.todos.next(todos);
      })
    );
  }

  clearDoneTasks(): Observable<any> {
    const requests = this.todos.getValue()
      .filter(todo => todo.done)
      .map(t => this.api.deleteTodo(t.id));

    return forkJoin(requests).pipe(
      switchMap(() => this.loadTodos())
    );
  }

  updateTodoById(id, updatedTodo: Partial<Todo>) {
    const todos = this.todos.getValue().slice();
    const i = todos.map(t => t.id).indexOf(id);

    if (i >= 0) {
      todos[i] = { ...todos[i], ...updatedTodo };
    }

    this.todos.next(todos);
  }

  private sortTodos = (list: Todo[]) => list.sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority > b.priority ? -1 : 1;
    }

    if (a.createdAt !== b.createdAt) {
      return a.createdAt > b.createdAt ? -1 : 1;
    }

    return 0;
  });
}
