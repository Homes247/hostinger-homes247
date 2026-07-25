import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPropertyNewEditComponent } from './post-property-new-edit.component';

describe('PostPropertyNewEditComponent', () => {
  let component: PostPropertyNewEditComponent;
  let fixture: ComponentFixture<PostPropertyNewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostPropertyNewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPropertyNewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
