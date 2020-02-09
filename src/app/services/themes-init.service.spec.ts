import { TestBed } from '@angular/core/testing';

import { ThemesInitService } from './themes-init.service';
import { ThemesService } from './themes.service';
import { Theme } from '../models/theme';
import { Subject } from 'rxjs';
// import 'jasmine';

describe('ThemesInitService', () => {
  let service: ThemesInitService;

  let themeServiceSpy = jasmine.createSpyObj<ThemesService>(['setCurrentTheme']);
  let setCurrentThemeSpy = themeServiceSpy.setCurrentTheme.and.callFake(t => {
    console.log('called fake set theme');

  });

  beforeEach(() => {
    service = new ThemesInitService(themeServiceSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set a theme on init', async () => {

    await service.init();
    console.log('finished calling init');
    expect(setCurrentThemeSpy.calls.any())
      .toBeTrue();
  });

});
