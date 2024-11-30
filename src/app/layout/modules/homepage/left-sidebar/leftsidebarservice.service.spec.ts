import { TestBed } from '@angular/core/testing';

import { LeftsidebarserviceService } from './leftsidebarservice.service';

describe('LeftsidebarserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeftsidebarserviceService = TestBed.get(LeftsidebarserviceService);
    expect(service).toBeTruthy();
  });
});
