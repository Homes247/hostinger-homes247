import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertServiceComponent } from './expert-service.component';

describe('ExpertServiceComponent', () => {
  let component: ExpertServiceComponent;
  let fixture: ComponentFixture<ExpertServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpertServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
