import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellEditPropertyComponent } from './sell-edit-property.component';

describe('SellEditPropertyComponent', () => {
  let component: SellEditPropertyComponent;
  let fixture: ComponentFixture<SellEditPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellEditPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellEditPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
