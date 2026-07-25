import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankMainComponent } from './bank-main.component';

describe('IfscComponent', () => {
  let component: BankMainComponent;
  let fixture: ComponentFixture<BankMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
