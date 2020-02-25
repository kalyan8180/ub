import { TestBed } from '@angular/core/testing';

import { LabAdminService } from './lab-admin.service';

describe('LabAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LabAdminService = TestBed.get(LabAdminService);
    expect(service).toBeTruthy();
  });
});
