import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitemapblogsComponent } from './sitemap_blogs.component';

describe('SitemapblogsComponent', () => {
  let component: SitemapblogsComponent;
  let fixture: ComponentFixture<SitemapblogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitemapblogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitemapblogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
