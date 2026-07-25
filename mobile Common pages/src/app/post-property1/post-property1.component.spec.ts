import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostProperty1Component } from './post-property1.component';

describe('PostProperty1Component', () => {
  let component: PostProperty1Component;
  let fixture: ComponentFixture<PostProperty1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostProperty1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostProperty1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
