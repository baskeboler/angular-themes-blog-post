import { Injectable } from '@angular/core';
import { Theme } from '../models/theme';
import * as tinycolor from 'tinycolor2';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
@Injectable()
export class ThemesService {

  private currentTheme: BehaviorSubject<Theme> = new BehaviorSubject(null);
  constructor() {
    this.currentTheme.subscribe(theme => {
      if (theme) {
        this.applyTheme(theme);
      }
    })
  }

  public setCurrentTheme(t: Theme) {
    this.currentTheme.next(t);
  }

  public getCurrentTheme(): Observable<Theme> {
    return this.currentTheme.asObservable();
  }
  private applyTheme(theme: Theme): void {

    Object.keys(theme.cssRules).forEach(rule => {

      const cssVarName = `--${rule}`;
      const cssRule = theme.cssRules[rule];
      this.registerCssVar(cssVarName, cssRule);
      if (this.isColor(cssVarName)){
        this.generateShades(cssVarName, cssRule);
      }
    });
  }

  private registerCssVar(name: string, value: string): void {
    document.documentElement.style.setProperty(name, value);
  }

  private isColor(name: string): boolean {
    return name && name.toLowerCase().endsWith('color');
  }
  public generateShades(name: string, color: string) {
    const c = tinycolor(color);
    for (let i = 1; i < 10; i++) {
      const lighter = c.clone().lighten(10 * i);
      const darker = c.clone().darken(10 * i);

      this.registerCssVar(`${name}Dark${i*10}`, darker.toHexString());
      this.registerCssVar(`${name}Light${i*10}`, lighter.toHexString());
    }
  }
}
