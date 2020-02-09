import { TestBed } from '@angular/core/testing';

import { ThemesService } from './themes.service';
import { platformBrowserTesting, BrowserTestingModule } from '@angular/platform-browser/testing';

describe('ThemesService', () => {
  let service: ThemesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
