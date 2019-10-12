import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CosasFeasComponent } from './cosas-feas.component';

describe('CosasFeasComponent', () => {
  let component: CosasFeasComponent;
  let fixture: ComponentFixture<CosasFeasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CosasFeasComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CosasFeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
