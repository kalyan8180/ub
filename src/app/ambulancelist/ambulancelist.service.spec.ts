import { TestBed } from '@angular/core/testing';

import { AmbulancelistService } from './ambulancelist.service';

describe('AmbulancelistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AmbulancelistService = TestBed.get(AmbulancelistService);
    expect(service).toBeTruthy();
  });
});
