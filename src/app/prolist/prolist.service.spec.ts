import { TestBed } from '@angular/core/testing';

import { ProlistService } from './prolist.service';

describe('ProlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProlistService = TestBed.get(ProlistService);
    expect(service).toBeTruthy();
  });
});
