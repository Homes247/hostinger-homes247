import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitemapBuilderOverviewComponent } from './sitemap-builder-overview.component';

describe('SitemapBuilderOverviewComponent', () => {
  let component: SitemapBuilderOverviewComponent;
  let fixture: ComponentFixture<SitemapBuilderOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitemapBuilderOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitemapBuilderOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
