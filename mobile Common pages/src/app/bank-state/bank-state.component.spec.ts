import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankStateComponent } from './bank-state.component';

describe('IfscStateComponent', () => {
  let component: BankStateComponent;
  let fixture: ComponentFixture<BankStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
