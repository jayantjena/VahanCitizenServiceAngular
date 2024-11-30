import { TestBed } from '@angular/core/testing';

import { UserManualServiceService } from './user-manual-service.service';

describe('UserManualServiceService', () => {
  let service: UserManualServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserManualServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
