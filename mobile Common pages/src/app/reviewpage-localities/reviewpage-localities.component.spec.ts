import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewpageLocalitiesComponent } from './reviewpage-localities.component';

describe('ReviewpageLocalitiesComponent', () => {
  let component: ReviewpageLocalitiesComponent;
  let fixture: ComponentFixture<ReviewpageLocalitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewpageLocalitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewpageLocalitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
