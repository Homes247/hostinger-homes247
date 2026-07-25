import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyFloorplansComponent } from './property-floorplans.component';

describe('PropertyFloorplansComponent', () => {
  let component: PropertyFloorplansComponent;
  let fixture: ComponentFixture<PropertyFloorplansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyFloorplansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyFloorplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
