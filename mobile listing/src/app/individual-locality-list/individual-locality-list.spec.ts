import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualLocalityList } from './individual-locality-list';

describe('IndividualLocalityList', () => {
  let component: IndividualLocalityList;
  let fixture: ComponentFixture<IndividualLocalityList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualLocalityList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualLocalityList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
