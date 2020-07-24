import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeraPage } from './primera.page';

describe('PrimeraPage', () => {
  let component: PrimeraPage;
  let fixture: ComponentFixture<PrimeraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeraPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
