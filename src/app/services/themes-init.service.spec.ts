import { TestBed } from '@angular/core/testing';

import { ThemesInitService } from './themes-init.service';

describe('ThemesInitService', () => {
  let service: ThemesInitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemesInitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
