import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderNew } from './builder-new';

describe('BuilderNew', () => {
  let component: BuilderNew;
  let fixture: ComponentFixture<BuilderNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuilderNew]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuilderNew);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
