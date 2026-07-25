import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderLocalitySectionTwo } from './builder-locality-section-two';

describe('BuilderLocalitySectionTwo', () => {
  let component: BuilderLocalitySectionTwo;
  let fixture: ComponentFixture<BuilderLocalitySectionTwo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuilderLocalitySectionTwo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuilderLocalitySectionTwo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
