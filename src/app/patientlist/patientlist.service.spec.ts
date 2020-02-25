import { TestBed } from '@angular/core/testing';

import { PatientlistService } from './patientlist.service';

describe('PatientlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatientlistService = TestBed.get(PatientlistService);
    expect(service).toBeTruthy();
  });
});
