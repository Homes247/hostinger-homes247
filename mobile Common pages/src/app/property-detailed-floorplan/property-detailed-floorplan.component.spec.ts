import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyDetailedFloorplanComponent } from './property-detailed-floorplan.component';

describe('PropertyDetailedFloorplanComponent', () => {
  let component: PropertyDetailedFloorplanComponent;
  let fixture: ComponentFixture<PropertyDetailedFloorplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyDetailedFloorplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyDetailedFloorplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
