import { TestBed } from '@angular/core/testing';

import { ThemesInitService } from './themes-init.service';
import { ThemesService } from './themes.service';

describe('ThemesInitService', () => {
  let service: ThemesInitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemesService]
    });
    service = TestBed.inject(ThemesInitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
