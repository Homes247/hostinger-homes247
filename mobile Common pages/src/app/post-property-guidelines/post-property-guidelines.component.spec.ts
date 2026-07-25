import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPropertyGuidelinesComponent } from './post-property-guidelines.component';

describe('PostPropertyGuidelinesComponent', () => {
  let component: PostPropertyGuidelinesComponent;
  let fixture: ComponentFixture<PostPropertyGuidelinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostPropertyGuidelinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPropertyGuidelinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
