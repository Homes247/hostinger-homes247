import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllIndia2 } from './all-india2';

describe('AllIndia2', () => {
  let component: AllIndia2;
  let fixture: ComponentFixture<AllIndia2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllIndia2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllIndia2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
