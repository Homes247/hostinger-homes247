import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatAutocompleteNew } from './mat-autocomplete-new';

describe('MatAutocompleteNew', () => {
  let component: MatAutocompleteNew;
  let fixture: ComponentFixture<MatAutocompleteNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatAutocompleteNew]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatAutocompleteNew);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
