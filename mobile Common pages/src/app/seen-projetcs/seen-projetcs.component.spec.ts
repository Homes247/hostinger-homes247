import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeenProjetcsComponent } from './seen-projetcs.component';

describe('SeenProjetcsComponent', () => {
  let component: SeenProjetcsComponent;
  let fixture: ComponentFixture<SeenProjetcsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeenProjetcsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeenProjetcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
