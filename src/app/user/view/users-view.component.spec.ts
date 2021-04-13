import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { User } from '@app/models';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApiService } from '../../core/api/api.service';
import { UsersViewComponent } from './users-view.component';

/* We create mocks for the pipes used. We could also import the SharedModule where these pipes are located, but in
 * general we want to test the UsersViewComponent without any dependencies. */
@Pipe({name: 'phoneHref'})
class PhoneHrefPipeMock implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

@Pipe({name: 'emailHref'})
class EmailHrefPipeMock implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

/* jest provides a functionality to create mocked classes from a module automatically */
jest.mock('../../core/api/api.service');

describe('UsersViewComponent', () => {
  let api: jest.Mocked<ApiService>;
  let component: UsersViewComponent;
  let fixture: ComponentFixture<UsersViewComponent>;
  let users: User[];
  let vader: User;
  let luke: User;

  beforeEach(async () => {
    vader = {
      firstName: 'Darth',
      lastName: 'Vader',
      fullName: 'Darth Vader',
      age: 100,
      email: 'darth.vader@empire.com',
      phone: '+49 151 1234567'
    };

    luke = {
      firstName: 'Luke',
      lastName: 'Skywalker',
      fullName: 'Luke Skywalker',
      age: 30,
      email: 'luke.skywalker@rebellion.com',
      phone: '+49 151 7654321'
    };

    users = [vader, luke];

    await TestBed.configureTestingModule({
      declarations: [UsersViewComponent, PhoneHrefPipeMock, EmailHrefPipeMock],
      providers: [ApiService]
    }).compileComponents();

    // Tell the mocked ApiService what to return on the relevant functions
    api = TestBed.inject(ApiService) as jest.Mocked<ApiService>;
    api.getUsers.mockReturnValue(of([...users]));

    fixture = TestBed.createComponent(UsersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Controller', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
      expect(component.users).toEqual(users);
    });

    it('should sort the users correctly', () => {
      component.sortBy('age', true);

      expect(component.users).toEqual([luke, vader]);
      expect(component.currentSort.key).toEqual('age');
      expect(component.currentSort.asc).toEqual(true);

      component.sortBy('email');
      expect(component.users).toEqual([vader, luke]);
      expect(component.currentSort.key).toEqual('email');
      expect(component.currentSort.asc).toEqual(true);

      component.sortBy('email');
      expect(component.users).toEqual([luke, vader]);
      expect(component.currentSort.key).toEqual('email');
      expect(component.currentSort.asc).toEqual(false);
    });
  });

  describe('View', () => {
    it('should initially display a loader', fakeAsync(() => {
      api.getUsers.mockReturnValue(of(users).pipe(delay(1000)));

      // The component needs to be recreated in this case
      fixture = TestBed.createComponent(UsersViewComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(fixture.debugElement.$('.loader')).toBeTruthy();
      expect(fixture.debugElement.$('table')).toBeFalsy();

      tick(1000);
      fixture.detectChanges();

      expect(fixture.debugElement.$('.loader')).toBeFalsy();
      expect(fixture.debugElement.$('table')).toBeTruthy();
    }));

    it('should display one row for each user', () => {
      const rows = fixture.debugElement.$$('.user-row');

      expect(rows.length).toEqual(users.length);
      expect(rows[0].$('.col-index').nativeElement).toHaveTextContent('1');
      expect(rows[0].$('.col-name').nativeElement).toHaveTextContent(vader.fullName);
      expect(rows[0].$('.col-age').nativeElement).toHaveTextContent(vader.age + '');
      expect(rows[0].$('.col-phone').nativeElement).toHaveTextContent(vader.phone);
      expect(rows[0].$('.col-email').nativeElement).toHaveTextContent(vader.email);
    });

    it('should sort when clicking on the table headers', () => {
      const headers = fixture.debugElement.$$('.sort-header');
      const spy = jest.spyOn(component, 'sortBy');

      // An event object is only required when the click handler function would make use of it
      headers[0].triggerEventHandler('click', null);

      expect(spy).toHaveBeenCalledWith('fullName');
      expect(headers[0].$('.sort-icon').nativeElement).toHaveClass('fa-chevron-up');
    });
  });
});
