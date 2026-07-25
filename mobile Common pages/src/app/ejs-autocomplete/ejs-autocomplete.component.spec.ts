import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EjsAutocompleteComponent } from './ejs-autocomplete.component';

describe('EjsAutocompleteComponent', () => {
  let component: EjsAutocompleteComponent;
  let fixture: ComponentFixture<EjsAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EjsAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EjsAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
