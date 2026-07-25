import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualFlatList } from './individual-flat-list';

describe('IndividualFlatList', () => {
  let component: IndividualFlatList;
  let fixture: ComponentFixture<IndividualFlatList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualFlatList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualFlatList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
