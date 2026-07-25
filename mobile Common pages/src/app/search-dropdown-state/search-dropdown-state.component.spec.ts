import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDropdownStateComponent } from './search-dropdown-state.component';

describe('SearchDropdownStateComponent', () => {
  let component: SearchDropdownStateComponent;
  let fixture: ComponentFixture<SearchDropdownStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDropdownStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDropdownStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
