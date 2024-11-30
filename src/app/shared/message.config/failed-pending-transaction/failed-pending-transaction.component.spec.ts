import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedPendingTransactionComponent } from './failed-pending-transaction.component';

describe('FailedPendingTransactionComponent', () => {
  let component: FailedPendingTransactionComponent;
  let fixture: ComponentFixture<FailedPendingTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FailedPendingTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FailedPendingTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
