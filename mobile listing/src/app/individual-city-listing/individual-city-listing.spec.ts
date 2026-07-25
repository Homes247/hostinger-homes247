import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualCityListing } from './individual-city-listing';

describe('IndividualCityListing', () => {
  let component: IndividualCityListing;
  let fixture: ComponentFixture<IndividualCityListing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualCityListing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualCityListing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
