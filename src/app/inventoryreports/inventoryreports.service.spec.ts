import { TestBed } from '@angular/core/testing';

import { InventoryreportsService } from './inventoryreports.service';

describe('InventoryreportsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InventoryreportsService = TestBed.get(InventoryreportsService);
    expect(service).toBeTruthy();
  });
});
