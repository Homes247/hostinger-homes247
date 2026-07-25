import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPlanManagement } from './subscription-plan-management';

describe('SubscriptionPlanManagement', () => {
  let component: SubscriptionPlanManagement;
  let fixture: ComponentFixture<SubscriptionPlanManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionPlanManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionPlanManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
