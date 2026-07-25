import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rentheader } from './rentheader';

describe('Rentheader', () => {
  let component: Rentheader;
  let fixture: ComponentFixture<Rentheader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rentheader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rentheader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
