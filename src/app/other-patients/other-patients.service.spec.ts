import { TestBed } from '@angular/core/testing';

import { OtherPatientsService } from './other-patients.service';

describe('OtherPatientsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OtherPatientsService = TestBed.get(OtherPatientsService);
    expect(service).toBeTruthy();
  });
});
