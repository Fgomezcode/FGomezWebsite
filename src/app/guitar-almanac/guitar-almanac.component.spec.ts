import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuitarAlmanacComponent } from './guitar-almanac.component';

describe('GuitarAlmanacComponent', () => {
  let component: GuitarAlmanacComponent;
  let fixture: ComponentFixture<GuitarAlmanacComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuitarAlmanacComponent]
    });
    fixture = TestBed.createComponent(GuitarAlmanacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
