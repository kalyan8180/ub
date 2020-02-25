import { TestBed } from '@angular/core/testing';

import { MonthlyprogressService } from './monthlyprogress.service';

describe('MonthlyprogressService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MonthlyprogressService = TestBed.get(MonthlyprogressService);
    expect(service).toBeTruthy();
  });
});
