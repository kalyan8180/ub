import { TestBed } from '@angular/core/testing';

import { AmbulanceService } from './ambulance.service';

describe('AmbulanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AmbulanceService = TestBed.get(AmbulanceService);
    expect(service).toBeTruthy();
  });
});
