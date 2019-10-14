import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CosasFeasListComponent } from './cosas-feas-list.component';

describe('CosasFeasListComponent', () => {
  let component: CosasFeasListComponent;
  let fixture: ComponentFixture<CosasFeasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CosasFeasListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CosasFeasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
