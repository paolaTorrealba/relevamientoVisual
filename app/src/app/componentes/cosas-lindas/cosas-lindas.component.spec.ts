import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CosasLindasComponent } from './cosas-lindas.component';

describe('CosasLindasComponent', () => {
  let component: CosasLindasComponent;
  let fixture: ComponentFixture<CosasLindasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CosasLindasComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CosasLindasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
