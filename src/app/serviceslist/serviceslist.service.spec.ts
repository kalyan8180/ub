import { TestBed } from '@angular/core/testing';

import { ServiceslistService } from './serviceslist.service';

describe('ServiceslistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceslistService = TestBed.get(ServiceslistService);
    expect(service).toBeTruthy();
  });
});
