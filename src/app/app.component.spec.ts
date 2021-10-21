import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Menubar } from 'primeng/menubar';
import { MockComponent, ngMocks } from 'ng-mocks';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  /* We would like to reuse the same TestBed in every test. ngMocks.faster suppresses reset of TestBed after each test
   * and allows to use TestBed, MockBuilder and MockRender in beforeAll. See https://ng-mocks.sudo.eu/api/ngMocks/faster */
  ngMocks.faster();

  beforeAll(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      declarations: [
        AppComponent,
        /* We do not want to test third-party dependencies. The PrimeNG menu will therefore be mocked. */
        MockComponent(Menubar)
      ]
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should have a router outlet', () => {
    expect(fixture.debugElement.$('router-outlet')).toBeTruthy();
  });

  it('should have links to all sub-pages', () => {
    const menu = fixture.debugElement.query(By.directive(Menubar));
    expect(menu).toBeTruthy();
    const menuComponent = menu.context;
    expect(menuComponent?.model).toEqual(app.menuItems);
  });
});
