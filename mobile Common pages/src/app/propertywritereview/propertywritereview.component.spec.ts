import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertywritereviewComponent } from './propertywritereview.component';

describe('PropertywritereviewComponent', () => {
  let component: PropertywritereviewComponent;
  let fixture: ComponentFixture<PropertywritereviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertywritereviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertywritereviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
