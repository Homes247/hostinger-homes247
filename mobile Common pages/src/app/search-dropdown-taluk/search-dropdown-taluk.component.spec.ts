import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDropdownTalukComponent } from './search-dropdown-taluk.component';

describe('SearchDropdownTalukComponent', () => {
  let component: SearchDropdownTalukComponent;
  let fixture: ComponentFixture<SearchDropdownTalukComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDropdownTalukComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDropdownTalukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
