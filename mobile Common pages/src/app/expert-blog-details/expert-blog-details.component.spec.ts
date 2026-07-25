import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertBlogDetailsComponent } from './expert-blog-details.component';

describe('ExpertBlogDetailsComponent', () => {
  let component: ExpertBlogDetailsComponent;
  let fixture: ComponentFixture<ExpertBlogDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpertBlogDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertBlogDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
