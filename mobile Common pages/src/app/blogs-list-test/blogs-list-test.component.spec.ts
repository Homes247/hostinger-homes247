import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsListTestComponent } from './blogs-list-test.component';

describe('BlogsListTestComponent', () => {
  let component: BlogsListTestComponent;
  let fixture: ComponentFixture<BlogsListTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogsListTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogsListTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
