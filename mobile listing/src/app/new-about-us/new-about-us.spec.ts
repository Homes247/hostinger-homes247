import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAboutUsComponent } from './new-about-us';

describe('NewAboutUsComponent', () => {
  let component: NewAboutUsComponent;
  let fixture: ComponentFixture<NewAboutUsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewAboutUsComponent]
    });
    fixture = TestBed.createComponent(NewAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
