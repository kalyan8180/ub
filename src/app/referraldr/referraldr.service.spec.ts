import { TestBed } from '@angular/core/testing';

import { ReferraldrService } from './referraldr.service';

describe('ReferraldrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReferraldrService = TestBed.get(ReferraldrService);
    expect(service).toBeTruthy();
  });
});
