import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityBasedListing } from './city-based-listing';

describe('CityBasedListing', () => {
  let component: CityBasedListing;
  let fixture: ComponentFixture<CityBasedListing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityBasedListing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityBasedListing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
