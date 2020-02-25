import { TestBed } from '@angular/core/testing';

import { AppointmentlistService } from './appointmentlist.service';

describe('AppointmentlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppointmentlistService = TestBed.get(AppointmentlistService);
    expect(service).toBeTruthy();
  });
});
