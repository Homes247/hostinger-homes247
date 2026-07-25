import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDropdownPinBranchComponent } from './search-dropdown-pin-branch.component';

describe('SearchDropdownPinBranchComponent', () => {
  let component: SearchDropdownPinBranchComponent;
  let fixture: ComponentFixture<SearchDropdownPinBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDropdownPinBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDropdownPinBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
