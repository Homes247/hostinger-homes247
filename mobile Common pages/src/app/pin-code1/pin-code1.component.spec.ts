import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinCode1Component } from './pin-code1.component';

describe('PinCode1Component', () => {
  let component: PinCode1Component;
  let fixture: ComponentFixture<PinCode1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinCode1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinCode1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
