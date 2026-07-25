import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllIndia } from './all-india';

describe('AllIndia', () => {
  let component: AllIndia;
  let fixture: ComponentFixture<AllIndia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllIndia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllIndia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
