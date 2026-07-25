import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyDisscussionDetailedComponent } from './property-disscussion-detailed.component';

describe('PropertyDisscussionDetailedComponent', () => {
  let component: PropertyDisscussionDetailedComponent;
  let fixture: ComponentFixture<PropertyDisscussionDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyDisscussionDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyDisscussionDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
