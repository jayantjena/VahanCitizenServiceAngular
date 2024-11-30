import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateRcComponent } from './duplicate-rc.component';

describe('DuplicateRcComponent', () => {
  let component: DuplicateRcComponent;
  let fixture: ComponentFixture<DuplicateRcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuplicateRcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicateRcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
