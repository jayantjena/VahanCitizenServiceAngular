import { TestBed } from '@angular/core/testing';

import { AadharServiceService } from './aadhar-service.service';

describe('AadharServiceService', () => {
  let service: AadharServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AadharServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
