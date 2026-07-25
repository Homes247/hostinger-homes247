import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IfscBranchComponent } from './bank-ifsc-branch.component';

describe('IfscBranchComponent', () => {
  let component: IfscBranchComponent;
  let fixture: ComponentFixture<IfscBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IfscBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IfscBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
