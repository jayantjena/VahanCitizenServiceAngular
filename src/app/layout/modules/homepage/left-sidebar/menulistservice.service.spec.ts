import { TestBed } from '@angular/core/testing';

import { MenulistserviceService } from './menulistservice.service';

describe('MenulistserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenulistserviceService = TestBed.get(MenulistserviceService);
    expect(service).toBeTruthy();
  });
});
