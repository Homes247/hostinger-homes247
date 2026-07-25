import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDropdownBank } from './search-dropdown-bank.component';

describe('SearchDropdownComponent', () => {
  let component: SearchDropdownBank;
  let fixture: ComponentFixture<SearchDropdownBank>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDropdownBank ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDropdownBank);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
