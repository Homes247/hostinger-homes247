import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLanding2Component } from './post-landing2.component';

describe('PostLanding2Component', () => {
  let component: PostLanding2Component;
  let fixture: ComponentFixture<PostLanding2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostLanding2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostLanding2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
