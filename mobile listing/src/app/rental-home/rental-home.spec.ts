import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalHome } from './rental-home';

describe('RentalHome', () => {
  let component: RentalHome;
  let fixture: ComponentFixture<RentalHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
