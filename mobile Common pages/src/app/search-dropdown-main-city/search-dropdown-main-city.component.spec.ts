import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDropdownMainCityComponent } from './search-dropdown-main-city.component';

describe('SearchDropdownMainCityComponent', () => {
  let component: SearchDropdownMainCityComponent;
  let fixture: ComponentFixture<SearchDropdownMainCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDropdownMainCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDropdownMainCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
