import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProptypeWithStatusComponent } from './proptype-with-status.component';

describe('ProptypeWithStatusComponent', () => {
  let component: ProptypeWithStatusComponent;
  let fixture: ComponentFixture<ProptypeWithStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProptypeWithStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProptypeWithStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
