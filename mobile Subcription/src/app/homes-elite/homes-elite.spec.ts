import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomesEliteComponent } from './homes-elite';

describe('HomesEliteComponent', () => {
  let component: HomesEliteComponent;
  let fixture: ComponentFixture<HomesEliteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ HomesEliteComponent ]
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