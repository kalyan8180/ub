import { TestBed } from '@angular/core/testing';

import { ItemledgerreportService } from './itemledgerreport.service';

describe('ItemledgerreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemledgerreportService = TestBed.get(ItemledgerreportService);
    expect(service).toBeTruthy();
  });
});
