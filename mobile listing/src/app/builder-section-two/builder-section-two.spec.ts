import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderSectionTwo } from './builder-section-two';

describe('BuilderSectionTwo', () => {
  let component: BuilderSectionTwo;
  let fixture: ComponentFixture<BuilderSectionTwo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuilderSectionTwo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuilderSectionTwo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
