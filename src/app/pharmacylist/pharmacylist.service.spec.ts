import { TestBed } from '@angular/core/testing';

import { PharmacylistService } from './pharmacylist.service';

describe('PharmacylistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PharmacylistService = TestBed.get(PharmacylistService);
    expect(service).toBeTruthy();
  });
});
