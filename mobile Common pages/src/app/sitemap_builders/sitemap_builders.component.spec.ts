import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitemapBuildersComponent } from './sitemap_builders.component';

describe('SitemapBuildersComponent', () => {
  let component: SitemapBuildersComponent;
  let fixture: ComponentFixture<SitemapBuildersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitemapBuildersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitemapBuildersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
