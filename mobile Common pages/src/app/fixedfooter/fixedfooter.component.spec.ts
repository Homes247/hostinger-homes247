import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedfooterComponent } from './fixedfooter.component';

describe('FixedfooterComponent', () => {
  let component: FixedfooterComponent;
  let fixture: ComponentFixture<FixedfooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedfooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
