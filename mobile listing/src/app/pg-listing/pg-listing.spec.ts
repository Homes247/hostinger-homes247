import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgListing } from './pg-listing';

describe('PgListing', () => {
  let component: PgListing;
  let fixture: ComponentFixture<PgListing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PgListing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgListing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
