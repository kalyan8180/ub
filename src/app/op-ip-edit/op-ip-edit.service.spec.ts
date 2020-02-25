import { TestBed } from '@angular/core/testing';

import { OpIpEditService } from './op-ip-edit.service';

describe('OpIpEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpIpEditService = TestBed.get(OpIpEditService);
    expect(service).toBeTruthy();
  });
});
