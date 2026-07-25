import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderLocalityNew } from './builder-locality-new';

describe('BuilderLocalityNew', () => {
  let component: BuilderLocalityNew;
  let fixture: ComponentFixture<BuilderLocalityNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuilderLocalityNew]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuilderLocalityNew);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
