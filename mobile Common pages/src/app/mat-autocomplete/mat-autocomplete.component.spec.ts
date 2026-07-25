import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatAutocompleteComponentss } from './mat-autocomplete.component';

describe('MatAutocompleteComponent', () => {
  let component: MatAutocompleteComponentss;
  let fixture: ComponentFixture<MatAutocompleteComponentss>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatAutocompleteComponentss ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatAutocompleteComponentss);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
