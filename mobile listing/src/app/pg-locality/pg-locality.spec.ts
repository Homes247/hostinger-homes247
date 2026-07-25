import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgLocality } from './pg-locality';

describe('PgLocality', () => {
  let component: PgLocality;
  let fixture: ComponentFixture<PgLocality>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PgLocality]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgLocality);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
