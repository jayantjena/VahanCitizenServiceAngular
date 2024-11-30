import { TestBed } from '@angular/core/testing';

import { VerifyReceiptService } from './verify-receipt.service';

describe('VerifyReceiptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VerifyReceiptService = TestBed.get(VerifyReceiptService);
    expect(service).toBeTruthy();
  });
});
