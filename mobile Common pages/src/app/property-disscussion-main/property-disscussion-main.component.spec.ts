import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyDisscussionMainComponent } from './property-disscussion-main.component';

describe('PropertyDisscussionMainComponent', () => {
  let component: PropertyDisscussionMainComponent;
  let fixture: ComponentFixture<PropertyDisscussionMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyDisscussionMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyDisscussionMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
