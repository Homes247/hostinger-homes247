import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityhomeComponent } from './cityhome.component';

describe('CityhomeComponent', () => {
  let component: CityhomeComponent;
  let fixture: ComponentFixture<CityhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
