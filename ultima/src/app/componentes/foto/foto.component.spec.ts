import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoComponent } from './foto.component';

describe('FotoComponent', () => {
  let component: FotoComponent;
  let fixture: ComponentFixture<FotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FotoComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
