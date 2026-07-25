import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitemapAllLocalitiesbycityComponent } from './sitemap-all-localitiesbycity.component';

describe('SitemapAllLocalitiesbycityComponent', () => {
  let component: SitemapAllLocalitiesbycityComponent;
  let fixture: ComponentFixture<SitemapAllLocalitiesbycityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitemapAllLocalitiesbycityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitemapAllLocalitiesbycityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
