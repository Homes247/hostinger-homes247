import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentinnerheaderComponent } from './rentinnerheader.component';

describe('RentinnerheaderComponent', () => {
  let component: RentinnerheaderComponent;
  let fixture: ComponentFixture<RentinnerheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentinnerheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentinnerheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
