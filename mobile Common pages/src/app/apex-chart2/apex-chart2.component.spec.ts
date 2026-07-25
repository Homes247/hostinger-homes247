import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApexChart2Component } from './apex-chart2.component';

describe('ApexChart2Component', () => {
  let component: ApexChart2Component;
  let fixture: ComponentFixture<ApexChart2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApexChart2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApexChart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
