import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDropdownMainCity } from './search-dropdown-main-city';

describe('SearchDropdownMainCity', () => {
  let component: SearchDropdownMainCity;
  let fixture: ComponentFixture<SearchDropdownMainCity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchDropdownMainCity]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchDropdownMainCity);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
