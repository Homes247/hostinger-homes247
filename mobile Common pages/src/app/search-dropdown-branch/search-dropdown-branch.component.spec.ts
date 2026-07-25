import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDropdownBranchComponent } from './search-dropdown-branch.component';

describe('SearchDropdownBranchComponent', () => {
  let component: SearchDropdownBranchComponent;
  let fixture: ComponentFixture<SearchDropdownBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDropdownBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDropdownBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
