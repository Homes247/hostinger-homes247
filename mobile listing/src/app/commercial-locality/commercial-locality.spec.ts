import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialLocality } from './commercial-locality';

describe('CommercialLocality', () => {
  let component: CommercialLocality;
  let fixture: ComponentFixture<CommercialLocality>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommercialLocality]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommercialLocality);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
