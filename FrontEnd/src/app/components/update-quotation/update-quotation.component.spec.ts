import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQuotationComponent } from './update-quotation.component';

describe('UpdateQuotationComponent', () => {
  let component: UpdateQuotationComponent;
  let fixture: ComponentFixture<UpdateQuotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateQuotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
