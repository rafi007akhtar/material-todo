import { TestBed } from '@angular/core/testing';

import { DateHelpersService } from './date-helpers.service';

describe('DateHelpersService', () => {
  let service: DateHelpersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateHelpersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
