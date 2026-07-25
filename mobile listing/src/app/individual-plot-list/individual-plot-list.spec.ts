import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualPlotList } from './individual-plot-list';

describe('IndividualPlotList', () => {
  let component: IndividualPlotList;
  let fixture: ComponentFixture<IndividualPlotList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualPlotList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualPlotList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
