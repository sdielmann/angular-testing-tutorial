import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { ngMocks } from 'ng-mocks';
import { Todo } from '@app/models';
import { HttpResponse } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  ngMocks.faster();

  beforeAll(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);

    // The HttpTestingController can be used to mock http requests and responses
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Make sure there are no pending requests after each test
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.baseUrl).toEqual('/api');
  });

  describe('Users', () => {
    it('should do a request to GET the user list', (done) => {
      const users = [];

      service.getUsers().subscribe(next => {
        // If the requests succeeds, we expect the user object here
        expect(next).toBe(users);
        // Make sure to call the done callback. If this is not being called, the test would be marked as failed.
        done();
      });

      // Tell the http mock how to respond to the request
      const request = httpMock.expectOne('/api/users');
      expect(request.request.method).toBe('GET');
      request.flush(users);
    });
  });

  describe('Todos', () => {
    it('should do a request to GET the todo list', (done) => {
      const todos = [];

      service.getTodos().subscribe(next => {
        // If the requests succeeds, we expect the user object here
        expect(next).toBe(todos);
        // Make sure to call the done callback. If this is not being called, the test would be marked as failed.
        done();
      });

      // Tell the http mock how to respond to the request
      const request = httpMock.expectOne('/api/todos');
      expect(request.request.method).toBe('GET');
      request.flush(todos);
    });

    it('should do a request to POST a new todo', (done) => {
      const todo: Partial<Todo> = {
        text: 'Do some work',
        createdAt: new Date().toISOString()
      };

      service.addTodo(todo).subscribe(next => {
        // If the requests succeeds, we expect the user object here
        expect(next).toBe(todo);
        // Make sure to call the done callback. If this is not being called, the test would be marked as failed.
        done();
      });

      // Tell the http mock how to respond to the request
      const req = httpMock.expectOne('/api/todos');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(todo);
      req.flush(todo);
    });

    it('should do a request to DELETE a todo', (done) => {
      service.deleteTodo('123').subscribe(() => {
        done();
      });

      // Tell the http mock how to respond to the request
      const req = httpMock.expectOne('/api/todos/123');
      expect(req.request.method).toBe('DELETE');
      req.event(new HttpResponse({status: 201}));
    });

    it('should do a request to PATCH a todo', (done) => {
      const id = '123';
      const updated = { done: true };
      const expectedRes: Todo = { id, ...updated, text: 'Foo Bar', createdAt: new Date().toISOString(), priority: 0 };

      service.patchTodo(id, updated).subscribe((next) => {
        expect(next).toEqual(expectedRes);
        done();
      });

      // Tell the http mock how to respond to the request
      const req = httpMock.expectOne('/api/todos/123');
      expect(req.request.body).toBe(updated);
      expect(req.request.method).toBe('PATCH');
      req.flush(expectedRes);
    });
  });


});
