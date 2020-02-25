import { TestBed } from '@angular/core/testing';

import { OspEditService } from './osp-edit.service';

describe('OspEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OspEditService = TestBed.get(OspEditService);
    expect(service).toBeTruthy();
  });
});
