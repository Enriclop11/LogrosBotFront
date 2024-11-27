import { TestBed } from '@angular/core/testing';

import { ApiLogrosService } from './api-logros.service';

describe('ApiLogrosService', () => {
  let service: ApiLogrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiLogrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
