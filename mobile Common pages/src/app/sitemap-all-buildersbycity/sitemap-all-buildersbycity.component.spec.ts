import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitemapAllBuildersbycityComponent } from './sitemap-all-buildersbycity.component';

describe('SitemapAllBuildersbycityComponent', () => {
  let component: SitemapAllBuildersbycityComponent;
  let fixture: ComponentFixture<SitemapAllBuildersbycityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitemapAllBuildersbycityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitemapAllBuildersbycityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
