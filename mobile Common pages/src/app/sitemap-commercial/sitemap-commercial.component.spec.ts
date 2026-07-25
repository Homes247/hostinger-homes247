import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitemapCommercialComponent } from './sitemap-commercial.component';

describe('SitemapCommercialComponent', () => {
  let component: SitemapCommercialComponent;
  let fixture: ComponentFixture<SitemapCommercialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitemapCommercialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitemapCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
