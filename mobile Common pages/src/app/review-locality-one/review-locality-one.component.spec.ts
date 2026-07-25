import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewLocalityOneComponent } from './review-locality-one.component';

describe('ReviewLocalityOneComponent', () => {
  let component: ReviewLocalityOneComponent;
  let fixture: ComponentFixture<ReviewLocalityOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewLocalityOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewLocalityOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
