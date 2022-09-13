import { TestBed } from '@angular/core/testing';

import { CookieServiceService } from './services/cookie-service.service';

describe('CookieServiceService', () => {
  let service: CookieServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookieServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
