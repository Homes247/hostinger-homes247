import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogMatautocompleteComponent } from './blog-matautocomplete.component';

describe('BlogMatautocompleteComponent', () => {
  let component: BlogMatautocompleteComponent;
  let fixture: ComponentFixture<BlogMatautocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogMatautocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogMatautocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
