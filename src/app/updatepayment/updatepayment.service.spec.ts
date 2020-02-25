import { TestBed } from '@angular/core/testing';

import { UpdatepaymentService } from './updatepayment.service';

describe('UpdatepaymentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdatepaymentService = TestBed.get(UpdatepaymentService);
    expect(service).toBeTruthy();
  });
});
