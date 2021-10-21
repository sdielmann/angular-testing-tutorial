import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTaskDialogComponent } from './add-new-task-dialog.component';

describe('AddNewTaskDialogComponent', () => {
  let component: AddNewTaskDialogComponent;
  let fixture: ComponentFixture<AddNewTaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewTaskDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
