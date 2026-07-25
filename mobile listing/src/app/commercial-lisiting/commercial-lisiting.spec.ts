import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialLisiting } from './commercial-lisiting';

describe('CommercialLisiting', () => {
  let component: CommercialLisiting;
  let fixture: ComponentFixture<CommercialLisiting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommercialLisiting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommercialLisiting);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
