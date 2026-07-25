import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryFormindComponent } from './enquiry-form-ind.component';

describe('EnquiryFormindComponent', () => {
  let component: EnquiryFormindComponent;
  let fixture: ComponentFixture<EnquiryFormindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquiryFormindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquiryFormindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
