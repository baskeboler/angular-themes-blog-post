import { Injectable } from '@angular/core';
import { ThemesService } from './themes.service';
import { DEFAULT_THEME, ALTERNATE_THEME } from '../models/theme';

@Injectable({
  providedIn: 'root'
})
export class ThemesInitService {

  constructor(private themes: ThemesService) { }


  public init(): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log('Initializing themes');

      this.themes.setCurrentTheme(ALTERNATE_THEME);
      resolve();
    });
  }
}
