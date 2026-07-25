import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellPropertiesComponent } from './sell-properties.component';

describe('SellPropertiesComponent', () => {
  let component: SellPropertiesComponent;
  let fixture: ComponentFixture<SellPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
