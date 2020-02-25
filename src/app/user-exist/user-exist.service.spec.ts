import { TestBed } from '@angular/core/testing';

import { UserExistService } from './user-exist.service';

describe('UserExistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserExistService = TestBed.get(UserExistService);
    expect(service).toBeTruthy();
  });
});
