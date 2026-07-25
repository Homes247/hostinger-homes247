import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgHome } from './pg-home';

describe('PgHome', () => {
  let component: PgHome;
  let fixture: ComponentFixture<PgHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PgHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
