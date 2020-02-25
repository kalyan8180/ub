import { TestBed } from '@angular/core/testing';

import { AdmindoctorviewService } from './admindoctorview.service';

describe('AdmindoctorviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdmindoctorviewService = TestBed.get(AdmindoctorviewService);
    expect(service).toBeTruthy();
  });
});
