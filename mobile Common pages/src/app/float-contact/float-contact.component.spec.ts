import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatContactComponent } from './float-contact.component';

describe('FloatContactComponent', () => {
  let component: FloatContactComponent;
  let fixture: ComponentFixture<FloatContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloatContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
