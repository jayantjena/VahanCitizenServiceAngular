import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyReceiptComponent } from './verify-receipt.component';

describe('VerifyReceiptComponent', () => {
  let component: VerifyReceiptComponent;
  let fixture: ComponentFixture<VerifyReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
