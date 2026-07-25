import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtptestComponent } from './otptest.component';

describe('OtptestComponent', () => {
  let component: OtptestComponent;
  let fixture: ComponentFixture<OtptestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtptestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtptestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
