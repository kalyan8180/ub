import { TestBed } from '@angular/core/testing';

import { OspbillinglistService } from './ospbillinglist.service';

describe('OspbillinglistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OspbillinglistService = TestBed.get(OspbillinglistService);
    expect(service).toBeTruthy();
  });
});
