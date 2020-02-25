import { TestBed } from '@angular/core/testing';

import { ExistvendorService } from './existvendor.service';

describe('ExistvendorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExistvendorService = TestBed.get(ExistvendorService);
    expect(service).toBeTruthy();
  });
});
