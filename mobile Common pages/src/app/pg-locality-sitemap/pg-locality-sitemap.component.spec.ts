import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PgLocalitySitemapComponent } from './pg-locality-sitemap.component';

describe('PgLocalitySitemapComponent', () => {
  let component: PgLocalitySitemapComponent;
  let fixture: ComponentFixture<PgLocalitySitemapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PgLocalitySitemapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PgLocalitySitemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
