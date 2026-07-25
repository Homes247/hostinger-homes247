import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryFormIndividual } from './enquiry-form-individual';

describe('EnquiryFormIndividual', () => {
  let component: EnquiryFormIndividual;
  let fixture: ComponentFixture<EnquiryFormIndividual>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnquiryFormIndividual]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquiryFormIndividual);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
