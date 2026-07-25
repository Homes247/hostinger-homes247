import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialDetails } from './commercial-details';

describe('CommercialDetails', () => {
  let component: CommercialDetails;
  let fixture: ComponentFixture<CommercialDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommercialDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommercialDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
