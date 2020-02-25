import { TestBed } from '@angular/core/testing';

import { ReferraldrlistService } from './referraldrlist.service';

describe('ReferraldrlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReferraldrlistService = TestBed.get(ReferraldrlistService);
    expect(service).toBeTruthy();
  });
});
