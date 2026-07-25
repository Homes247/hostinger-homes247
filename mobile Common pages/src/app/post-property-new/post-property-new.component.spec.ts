import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPropertyNewComponent } from './post-property-new.component';

describe('PostPropertyNewComponent', () => {
  let component: PostPropertyNewComponent;
  let fixture: ComponentFixture<PostPropertyNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostPropertyNewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPropertyNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
