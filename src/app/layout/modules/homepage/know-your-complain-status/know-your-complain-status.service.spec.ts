import { TestBed } from '@angular/core/testing';

import { KnowYourComplainStatusService } from './know-your-complain-status.service';

describe('KnowYourComplainStatusService', () => {
  let service: KnowYourComplainStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KnowYourComplainStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
