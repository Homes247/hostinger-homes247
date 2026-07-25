import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rentdetails } from './rentdetails';

describe('Rentdetails', () => {
  let component: Rentdetails;
  let fixture: ComponentFixture<Rentdetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rentdetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rentdetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
