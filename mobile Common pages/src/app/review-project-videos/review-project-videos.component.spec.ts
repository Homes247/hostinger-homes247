import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewProjectVideosComponent } from './review-project-videos.component';

describe('ReviewProjectVideosComponent', () => {
  let component: ReviewProjectVideosComponent;
  let fixture: ComponentFixture<ReviewProjectVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewProjectVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewProjectVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
