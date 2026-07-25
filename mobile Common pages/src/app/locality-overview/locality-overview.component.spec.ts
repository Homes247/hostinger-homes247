import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalityOverviewComponent } from './locality-overview.component';

describe('LocalityOverviewComponent', () => {
  let component: LocalityOverviewComponent;
  let fixture: ComponentFixture<LocalityOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalityOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalityOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
