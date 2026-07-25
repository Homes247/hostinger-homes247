import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyTypeLocalityComponent } from './property-type-locality.component';

describe('PropertyTypeLocalityComponent', () => {
  let component: PropertyTypeLocalityComponent;
  let fixture: ComponentFixture<PropertyTypeLocalityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyTypeLocalityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyTypeLocalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
