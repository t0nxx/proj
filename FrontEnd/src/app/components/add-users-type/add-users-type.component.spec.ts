import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsersTypeComponent } from './add-users-type.component';

describe('AddUsersTypeComponent', () => {
  let component: AddUsersTypeComponent;
  let fixture: ComponentFixture<AddUsersTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUsersTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUsersTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
