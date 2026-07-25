import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalityBasedListing } from './locality-based-listing';

describe('LocalityBasedListing', () => {
  let component: LocalityBasedListing;
  let fixture: ComponentFixture<LocalityBasedListing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalityBasedListing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalityBasedListing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
