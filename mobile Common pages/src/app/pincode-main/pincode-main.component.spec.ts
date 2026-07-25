import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PincodeMainComponent } from './pincode-main.component';

describe('PincodeMainComponent', () => {
  let component: PincodeMainComponent;
  let fixture: ComponentFixture<PincodeMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PincodeMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PincodeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
