import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinCode2Component } from './pin-code2.component';

describe('PinCode2Component', () => {
  let component: PinCode2Component;
  let fixture: ComponentFixture<PinCode2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinCode2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinCode2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
