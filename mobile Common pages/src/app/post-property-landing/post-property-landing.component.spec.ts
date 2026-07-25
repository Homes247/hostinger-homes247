import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPropertyLandingComponent } from './post-property-landing.component';

describe('PostPropertyLandingComponent', () => {
  let component: PostPropertyLandingComponent;
  let fixture: ComponentFixture<PostPropertyLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostPropertyLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPropertyLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
