import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBhkDetailsComponent } from './project-bhk-details.component';

describe('ProjectBhkDetailsComponent', () => {
  let component: ProjectBhkDetailsComponent;
  let fixture: ComponentFixture<ProjectBhkDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectBhkDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBhkDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
