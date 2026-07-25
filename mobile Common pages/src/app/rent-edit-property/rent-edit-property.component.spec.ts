import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentEditPropertyComponent } from './rent-edit-property.component';

describe('RentEditPropertyComponent', () => {
  let component: RentEditPropertyComponent;
  let fixture: ComponentFixture<RentEditPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentEditPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentEditPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
