import { TestBed } from '@angular/core/testing';

import { OutpatientlistService } from './outpatientlist.service';

describe('OutpatientlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OutpatientlistService = TestBed.get(OutpatientlistService);
    expect(service).toBeTruthy();
  });
});
