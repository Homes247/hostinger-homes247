import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankIfscDetailsComponent } from './bank-ifsc-details.component';

describe('BankIfscDetailsComponent', () => {
  let component: BankIfscDetailsComponent;
  let fixture: ComponentFixture<BankIfscDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankIfscDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankIfscDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
