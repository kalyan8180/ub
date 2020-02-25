import { TestBed } from '@angular/core/testing';

import { LabresultService } from './labresult.service';

describe('LabresultService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LabresultService = TestBed.get(LabresultService);
    expect(service).toBeTruthy();
  });
});
