import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitemapCommercialLocalityComponent } from './sitemap-commercial-locality.component';

describe('SitemapCommercialLocalityComponent', () => {
  let component: SitemapCommercialLocalityComponent;
  let fixture: ComponentFixture<SitemapCommercialLocalityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitemapCommercialLocalityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitemapCommercialLocalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
