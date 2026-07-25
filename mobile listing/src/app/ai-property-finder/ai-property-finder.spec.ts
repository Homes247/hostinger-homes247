import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiPropertyFinder } from './ai-property-finder';

describe('AiPropertyFinder', () => {
  let component: AiPropertyFinder;
  let fixture: ComponentFixture<AiPropertyFinder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiPropertyFinder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiPropertyFinder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
