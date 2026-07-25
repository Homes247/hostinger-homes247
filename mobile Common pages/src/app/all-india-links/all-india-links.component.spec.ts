import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllIndiaLinksComponent } from './all-india-links.component';

describe('AllIndiaLinksComponent', () => {
  let component: AllIndiaLinksComponent;
  let fixture: ComponentFixture<AllIndiaLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllIndiaLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllIndiaLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
