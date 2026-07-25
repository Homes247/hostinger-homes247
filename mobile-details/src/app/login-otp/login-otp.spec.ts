import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOtp } from './login-otp';

describe('LoginOtp', () => {
  let component: LoginOtp;
  let fixture: ComponentFixture<LoginOtp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginOtp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginOtp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
