import { TestBed } from '@angular/core/testing';

import { ApplstatusserviceService } from './applstatusservice.service';

describe('ApplstatusserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplstatusserviceService = TestBed.get(ApplstatusserviceService);
    expect(service).toBeTruthy();
  });
});
