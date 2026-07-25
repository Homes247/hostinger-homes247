import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatAutocompleteNewComponent } from './mat-autocomplete-new.component';

describe('MatAutocompleteNewComponent', () => {
  let component: MatAutocompleteNewComponent;
  let fixture: ComponentFixture<MatAutocompleteNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatAutocompleteNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatAutocompleteNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
