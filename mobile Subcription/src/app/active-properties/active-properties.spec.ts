import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveProperties } from './active-properties';

describe('ActiveProperties', () => {
  let component: ActiveProperties;
  let fixture: ComponentFixture<ActiveProperties>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveProperties]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveProperties);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
