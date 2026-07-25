import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerHeader } from './inner-header';

describe('InnerHeader', () => {
  let component: InnerHeader;
  let fixture: ComponentFixture<InnerHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InnerHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InnerHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
