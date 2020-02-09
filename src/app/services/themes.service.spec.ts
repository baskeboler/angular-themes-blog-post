import { TestBed } from '@angular/core/testing';

import { ThemesService } from './themes.service';
import { platformBrowserTesting, BrowserTestingModule } from '@angular/platform-browser/testing';
import { DEFAULT_THEME } from '../models/theme';

describe('ThemesService', () => {
  let service: ThemesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate a random theme', () => {
    expect(service.generateRandomTheme()).toBeDefined();
  });

  it('should notify observers when theme changes', (done: DoneFn) => {
    service.setCurrentTheme(DEFAULT_THEME);
    service.getCurrentTheme().subscribe(newTheme => {
      expect(newTheme).toEqual(DEFAULT_THEME);
      done();
    });
  });

});
