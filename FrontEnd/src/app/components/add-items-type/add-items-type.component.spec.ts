import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemsTypeComponent } from './add-items-type.component';

describe('AddItemsTypeComponent', () => {
  let component: AddItemsTypeComponent;
  let fixture: ComponentFixture<AddItemsTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddItemsTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemsTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
