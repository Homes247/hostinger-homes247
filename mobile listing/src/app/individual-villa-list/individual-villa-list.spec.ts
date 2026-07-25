import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualVillaList } from './individual-villa-list';

describe('IndividualVillaList', () => {
  let component: IndividualVillaList;
  let fixture: ComponentFixture<IndividualVillaList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualVillaList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualVillaList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
