import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentLocalityListing } from './rent-locality-listing';

describe('RentLocalityListing', () => {
  let component: RentLocalityListing;
  let fixture: ComponentFixture<RentLocalityListing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentLocalityListing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentLocalityListing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
