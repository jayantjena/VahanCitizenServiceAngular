import { TestBed } from '@angular/core/testing';

import { PgiserviceService } from './pgiservice.service';

describe('PgiserviceService', () => {
  let service: PgiserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PgiserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
