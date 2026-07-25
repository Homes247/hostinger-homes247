import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjsAutocomplete } from './ejs-autocomplete';

describe('EjsAutocomplete', () => {
  let component: EjsAutocomplete;
  let fixture: ComponentFixture<EjsAutocomplete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EjsAutocomplete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjsAutocomplete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
