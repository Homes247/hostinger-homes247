import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinCode3Component } from './pin-code3.component';

describe('PinCode3Component', () => {
  let component: PinCode3Component;
  let fixture: ComponentFixture<PinCode3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinCode3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinCode3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
