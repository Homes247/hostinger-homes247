import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent2 } from './footer2.component';

describe('FooterComponent2', () => {
  let component: FooterComponent2;
  let fixture: ComponentFixture<FooterComponent2>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent2 ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
