import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyBrochureFloorplansComponent } from './property-brochure-floorplans.component';

describe('PropertyBrochureFloorplansComponent', () => {
  let component: PropertyBrochureFloorplansComponent;
  let fixture: ComponentFixture<PropertyBrochureFloorplansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyBrochureFloorplansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyBrochureFloorplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
