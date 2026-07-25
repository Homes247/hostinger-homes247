import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPreferences } from './my-preferences';

describe('MyPreferences', () => {
  let component: MyPreferences;
  let fixture: ComponentFixture<MyPreferences>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPreferences]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPreferences);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
