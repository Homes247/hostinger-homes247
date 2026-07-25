import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinCode4Component } from './pin-code4.component';

describe('PinCode4Component', () => {
  let component: PinCode4Component;
  let fixture: ComponentFixture<PinCode4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinCode4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinCode4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
