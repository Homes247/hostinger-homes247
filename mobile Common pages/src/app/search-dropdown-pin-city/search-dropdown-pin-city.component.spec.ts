import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDropdownPinCityComponent } from './search-dropdown-pin-city.component';

describe('SearchDropdownPinCityComponent', () => {
  let component: SearchDropdownPinCityComponent;
  let fixture: ComponentFixture<SearchDropdownPinCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDropdownPinCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDropdownPinCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
