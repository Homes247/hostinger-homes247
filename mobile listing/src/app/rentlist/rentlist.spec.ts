import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rentlist } from './rentlist';

describe('Rentlist', () => {
  let component: Rentlist;
  let fixture: ComponentFixture<Rentlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rentlist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rentlist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
