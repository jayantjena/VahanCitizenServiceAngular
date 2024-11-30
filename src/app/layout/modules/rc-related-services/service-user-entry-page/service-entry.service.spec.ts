import { TestBed } from '@angular/core/testing';

import { ServiceEntryService } from './service-entry.service';

describe('ServiceEntryService', () => {
  let service: ServiceEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
