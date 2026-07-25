import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerHeadderWithSidenav } from './inner-headder-with-sidenav';

describe('InnerHeadderWithSidenav', () => {
  let component: InnerHeadderWithSidenav;
  let fixture: ComponentFixture<InnerHeadderWithSidenav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InnerHeadderWithSidenav]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InnerHeadderWithSidenav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
