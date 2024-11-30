import { TestBed } from '@angular/core/testing';

import { MaphomepageserviceService } from './maphomepageservice.service';

describe('MaphomepageserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaphomepageserviceService = TestBed.get(MaphomepageserviceService);
    expect(service).toBeTruthy();
  });
});
