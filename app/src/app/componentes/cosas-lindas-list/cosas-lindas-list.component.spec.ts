import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CosasLindasListComponent } from './cosas-lindas-list.component';

describe('CosasLindasListComponent', () => {
  let component: CosasLindasListComponent;
  let fixture: ComponentFixture<CosasLindasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CosasLindasListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CosasLindasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
