import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyseenprojectsComponent } from './propertyseenprojects.component';

describe('PropertyseenprojectsComponent', () => {
  let component: PropertyseenprojectsComponent;
  let fixture: ComponentFixture<PropertyseenprojectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyseenprojectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyseenprojectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
