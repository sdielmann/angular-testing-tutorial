import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

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
    const links = fixture.debugElement.$$('a.app-nav__link');

    expect(links.length).toEqual(2);

    /* I would suggest not to test the "click" itself here, because we can expect Angular itself to work. The routerLink
    * directive also sets the href attribute on the elements, so we can test if they have been set. */
    expect(links[0].nativeElement).toHaveAttribute('href', '/');
    expect(links[1].nativeElement).toHaveAttribute('href', '/users');
  });
});
