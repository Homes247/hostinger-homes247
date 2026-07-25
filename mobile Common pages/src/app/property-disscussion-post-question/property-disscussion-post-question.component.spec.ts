import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyDisscussionPostQuestionComponent } from './property-disscussion-post-question.component';

describe('PropertyDisscussionPostQuestionComponent', () => {
  let component: PropertyDisscussionPostQuestionComponent;
  let fixture: ComponentFixture<PropertyDisscussionPostQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyDisscussionPostQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyDisscussionPostQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
