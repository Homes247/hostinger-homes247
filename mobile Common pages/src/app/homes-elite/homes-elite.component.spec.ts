import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomesEliteComponent } from './homes-elite.component';

describe('HomesEliteComponent', () => {
  let component: HomesEliteComponent;
  let fixture: ComponentFixture<HomesEliteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomesEliteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomesEliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
