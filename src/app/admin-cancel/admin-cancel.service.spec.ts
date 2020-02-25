import { TestBed } from '@angular/core/testing';

import { AdminCancelService } from './admin-cancel.service';

describe('AdminCancelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminCancelService = TestBed.get(AdminCancelService);
    expect(service).toBeTruthy();
  });
});
