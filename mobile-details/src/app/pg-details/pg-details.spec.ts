import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgDetailsComponent } from './pg-details';

describe('PgDetailsComponent', () => {
  let component: PgDetailsComponent;
  let fixture: ComponentFixture<PgDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PgDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
