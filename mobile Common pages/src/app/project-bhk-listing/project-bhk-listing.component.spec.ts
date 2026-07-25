import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBhkListingComponent } from './project-bhk-listing.component';

describe('ProjectBhkListingComponent', () => {
  let component: ProjectBhkListingComponent;
  let fixture: ComponentFixture<ProjectBhkListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectBhkListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBhkListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
