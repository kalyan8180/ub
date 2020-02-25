npm import { TestBed } from '@angular/core/testing';

import { SalemanagementService } from './salemanagement.service';

describe('SalemanagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalemanagementService = TestBed.get(SalemanagementService);
    expect(service).toBeTruthy();
  });
});