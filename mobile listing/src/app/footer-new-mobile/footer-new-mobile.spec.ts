import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterNewMobile } from './footer-new-mobile';

describe('FooterNewMobile', () => {
  let component: FooterNewMobile;
  let fixture: ComponentFixture<FooterNewMobile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterNewMobile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterNewMobile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
