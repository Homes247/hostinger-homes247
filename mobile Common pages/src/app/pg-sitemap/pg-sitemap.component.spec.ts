import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PgSitemapComponent } from './pg-sitemap.component';

describe('PgSitemapComponent', () => {
  let component: PgSitemapComponent;
  let fixture: ComponentFixture<PgSitemapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PgSitemapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PgSitemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
