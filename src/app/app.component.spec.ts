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
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should have a router outlet', () => {
    expect(fixture.debugElement.$('router-outlet')).toBeTruthy();
  });

  it('should have links to all sub-pages', () => {
    const links = fixture.debugElement.$$('a.app-nav__link');

    // I would suggest not to test the "click" itself here, because we can expect Angular itself to work
    expect(links.length).toEqual(2);
    expect(links[0].nativeElement).toHaveAttribute('routerlink', '/');
    expect(links[1].nativeElement).toHaveAttribute('routerlink', '/something');
  });
});
