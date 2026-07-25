import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpLoginNewComponent } from './otp-login-new.component';

describe('OtpLoginNewComponent', () => {
  let component: OtpLoginNewComponent;
  let fixture: ComponentFixture<OtpLoginNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpLoginNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpLoginNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
