import { TestBed } from '@angular/core/testing';

import { WardonlineService } from './wardonline.service';

describe('WardonlineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WardonlineService = TestBed.get(WardonlineService);
    expect(service).toBeTruthy();
  });
});
