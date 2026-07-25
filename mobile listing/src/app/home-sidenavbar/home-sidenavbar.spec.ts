import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSidenavbar } from './home-sidenavbar';

describe('HomeSidenavbar', () => {
  let component: HomeSidenavbar;
  let fixture: ComponentFixture<HomeSidenavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSidenavbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSidenavbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
