import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {OnlineExpoComponent} from './online-expo.component';

describe('DesktopTwoComponent', () => {
  let component: OnlineExpoComponent;
  let fixture: ComponentFixture<OnlineExpoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineExpoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineExpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
