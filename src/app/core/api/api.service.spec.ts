import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
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

  it('should do a request to retrieve the user list', (done) => {
    const users = [];

    service.getUsers().subscribe(next => {
      // If the requests succeeds, we expect the user object here
      expect(next).toBe(users);
      // Make sure to call the done callback. If this is not being called, the test would be marked as failed.
      done();
    });

    // Tell the http mock how to respond to the request
    const request = httpMock.expectOne('/api/users');
    request.flush(users);
  });
});
