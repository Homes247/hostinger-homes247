import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewpageProjectsComponent } from './reviewpage-projects.component';

describe('ReviewpageProjectsComponent', () => {
  let component: ReviewpageProjectsComponent;
  let fixture: ComponentFixture<ReviewpageProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewpageProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewpageProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
