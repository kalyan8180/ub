import { TestBed } from '@angular/core/testing';

import { HealthchekupService } from './healthchekup.service';

describe('HealthchekupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HealthchekupService = TestBed.get(HealthchekupService);
    expect(service).toBeTruthy();
  });
});
