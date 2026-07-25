import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialHome } from './commercial-home';

describe('CommercialHome', () => {
  let component: CommercialHome;
  let fixture: ComponentFixture<CommercialHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommercialHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommercialHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
