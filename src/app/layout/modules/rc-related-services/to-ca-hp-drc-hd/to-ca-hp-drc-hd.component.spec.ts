import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToCaHpDrcHdComponent } from './to-ca-hp-drc-hd.component';

describe('ToCaHpDrcHdComponent', () => {
  let component: ToCaHpDrcHdComponent;
  let fixture: ComponentFixture<ToCaHpDrcHdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToCaHpDrcHdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToCaHpDrcHdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
