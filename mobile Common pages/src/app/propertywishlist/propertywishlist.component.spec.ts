import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertywishlistComponent } from './propertywishlist.component';

describe('PropertywishlistComponent', () => {
  let component: PropertywishlistComponent;
  let fixture: ComponentFixture<PropertywishlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertywishlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertywishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
