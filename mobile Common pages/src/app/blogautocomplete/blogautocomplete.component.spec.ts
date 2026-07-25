import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogautocompleteComponent } from './blogautocomplete.component';

describe('BlogautocompleteComponent', () => {
  let component: BlogautocompleteComponent;
  let fixture: ComponentFixture<BlogautocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogautocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogautocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
