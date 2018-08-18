import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTypesComponent } from './users-types.component';

describe('UsersTypesComponent', () => {
  let component: UsersTypesComponent;
  let fixture: ComponentFixture<UsersTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
