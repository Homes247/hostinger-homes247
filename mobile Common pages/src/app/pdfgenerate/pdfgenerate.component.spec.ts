import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfgenerateComponent } from './pdfgenerate.component';

describe('PdfgenerateComponent', () => {
  let component: PdfgenerateComponent;
  let fixture: ComponentFixture<PdfgenerateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfgenerateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfgenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
