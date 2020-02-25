import { TestBed } from '@angular/core/testing';

import { PaymentvocherService } from './paymentvocher.service';

describe('PaymentvocherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaymentvocherService = TestBed.get(PaymentvocherService);
    expect(service).toBeTruthy();
  });
});
