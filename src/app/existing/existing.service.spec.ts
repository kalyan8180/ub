import { TestBed } from '@angular/core/testing';

import { ExistingService } from './existing.service';

describe('ExistingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExistingService = TestBed.get(ExistingService);
    expect(service).toBeTruthy();
  });
});
