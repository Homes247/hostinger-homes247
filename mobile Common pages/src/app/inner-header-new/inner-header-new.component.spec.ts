import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerHeaderNewComponent } from './inner-header-new.component';

describe('InnerHeaderNewComponent', () => {
  let component: InnerHeaderNewComponent;
  let fixture: ComponentFixture<InnerHeaderNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerHeaderNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerHeaderNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
