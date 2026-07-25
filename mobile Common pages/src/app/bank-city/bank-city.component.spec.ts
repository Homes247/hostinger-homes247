import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IfscCityComponent } from './bank-city.component';

describe('IfscCityComponent', () => {
  let component: IfscCityComponent;
  let fixture: ComponentFixture<IfscCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IfscCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IfscCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
