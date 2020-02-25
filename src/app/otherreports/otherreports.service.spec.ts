import { TestBed } from '@angular/core/testing';

import { OtherreportsService } from './otherreports.service';

describe('OtherreportsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OtherreportsService = TestBed.get(OtherreportsService);
    expect(service).toBeTruthy();
  });
});
