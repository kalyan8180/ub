import { TestBed } from '@angular/core/testing';

import { DuebillsService } from './duebills.service';

describe('DuebillsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DuebillsService = TestBed.get(DuebillsService);
    expect(service).toBeTruthy();
  });
});
