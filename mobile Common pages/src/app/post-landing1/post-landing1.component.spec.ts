import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLanding1Component } from './post-landing1.component';

describe('PostLanding1Component', () => {
  let component: PostLanding1Component;
  let fixture: ComponentFixture<PostLanding1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostLanding1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostLanding1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
