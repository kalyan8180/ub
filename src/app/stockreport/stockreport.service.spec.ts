import { TestBed } from '@angular/core/testing';

import { StockreportService } from './stockreport.service';

describe('StockreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockreportService = TestBed.get(StockreportService);
    expect(service).toBeTruthy();
  });
});
