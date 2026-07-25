import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllIndiaSidenavbarComponent } from './all-india-sidenavbar.component';

describe('AllIndiaSidenavbarComponent', () => {
  let component: AllIndiaSidenavbarComponent;
  let fixture: ComponentFixture<AllIndiaSidenavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllIndiaSidenavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllIndiaSidenavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
