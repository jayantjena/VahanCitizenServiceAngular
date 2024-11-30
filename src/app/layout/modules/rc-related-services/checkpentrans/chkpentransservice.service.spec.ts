import { TestBed } from '@angular/core/testing';

import { ChkpentransserviceService } from './chkpentransservice.service';

describe('ChkpentransserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChkpentransserviceService = TestBed.get(ChkpentransserviceService);
    expect(service).toBeTruthy();
  });
});
