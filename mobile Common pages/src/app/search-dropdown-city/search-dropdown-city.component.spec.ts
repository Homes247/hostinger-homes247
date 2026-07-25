import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDropdownCityComponent } from './search-dropdown-city.component';

describe('SearchDropdownCityComponent', () => {
  let component: SearchDropdownCityComponent;
  let fixture: ComponentFixture<SearchDropdownCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDropdownCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDropdownCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
