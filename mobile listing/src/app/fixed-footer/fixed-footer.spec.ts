import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedFooter } from './fixed-footer';

describe('FixedFooter', () => {
  let component: FixedFooter;
  let fixture: ComponentFixture<FixedFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixedFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixedFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
