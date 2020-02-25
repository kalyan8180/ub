import { TestBed } from '@angular/core/testing';

import { BedallocationService } from './bedallocation.service';

describe('BedallocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BedallocationService = TestBed.get(BedallocationService);
    expect(service).toBeTruthy();
  });
});
