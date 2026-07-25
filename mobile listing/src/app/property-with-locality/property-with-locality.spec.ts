import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyWithLocality } from './property-with-locality';

describe('PropertyWithLocality', () => {
  let component: PropertyWithLocality;
  let fixture: ComponentFixture<PropertyWithLocality>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyWithLocality]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyWithLocality);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
