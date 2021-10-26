import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ngMocks } from 'ng-mocks';

import { HomeViewComponent } from './home-view.component';

describe('HomeViewComponent', () => {
  let component: HomeViewComponent;
  let fixture: ComponentFixture<HomeViewComponent>;

  ngMocks.faster();

  beforeAll(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeViewComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a hero area with some text', () => {
    const title = fixture.debugElement.query(By.css('h1'));
    const text = fixture.debugElement.query(By.css('p'));

    // Test that the elements exist somewhere in the DOM
    expect(title).toBeTruthy();
    expect(text).toBeTruthy();

    // To go even further, we can also test the content of the elements
    expect(title.nativeElement).toHaveTextContent('Kickstart your app with test automation');
    expect(text.nativeElement).toHaveTextContent(
      'Start testing your application now with automated tests and never fear regression bugs in agile development again.');
  });

  it('should have a feature section that displays benefits from test automation', () => {
    const benefits = fixture.debugElement.$$('.benefit');

    for(let i = 0; i < component.features.length; i++) {
      const f = component.features[i];
      expect(benefits[i].$('i').nativeElement).toHaveClass('pi-' + f.icon);
      expect(benefits[i].$('.benefit__title').nativeElement).toHaveTextContent(f.title);
      expect(benefits[i].$('.benefit__desc').nativeElement).toHaveTextContent(f.text);
    }
  });
});
