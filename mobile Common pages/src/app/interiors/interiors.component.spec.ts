import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteriorsComponent } from './interiors.component';

describe('InteriorsComponent', () => {
  let component: InteriorsComponent;
  let fixture: ComponentFixture<InteriorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteriorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteriorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
