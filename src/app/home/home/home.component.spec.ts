import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title and some text', () => {
    const title = fixture.debugElement.query(By.css('h1'));
    const text = fixture.debugElement.query(By.css('p'));

    // Test that the elements exist somewhere in the DOM
    expect(title).toBeTruthy();
    expect(text).toBeTruthy();

    // To go even further, we can also test the content of the elements
    expect(title.nativeElement).toHaveTextContent('Home');
    expect(text.nativeElement).toHaveTextContent('Welcome to the testing tutorial on Angular.');
  });
});
