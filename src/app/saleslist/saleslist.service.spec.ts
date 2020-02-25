import { TestBed } from '@angular/core/testing';

import { SaleslistService } from './saleslist.service';

describe('SaleslistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaleslistService = TestBed.get(SaleslistService);
    expect(service).toBeTruthy();
  });
});
