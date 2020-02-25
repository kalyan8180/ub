import { TestBed } from '@angular/core/testing';

import { ProcurmentService } from './procurment.service';

describe('ProcurmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcurmentService = TestBed.get(ProcurmentService);
    expect(service).toBeTruthy();
  });
});
