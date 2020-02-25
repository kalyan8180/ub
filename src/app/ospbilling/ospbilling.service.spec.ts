import { TestBed } from '@angular/core/testing';

import { OspbillingService } from './ospbilling.service';

describe('OspbillingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OspbillingService = TestBed.get(OspbillingService);
    expect(service).toBeTruthy();
  });
});
