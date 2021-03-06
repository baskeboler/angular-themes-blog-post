import { Injectable } from '@angular/core';
import { Theme, FONT_FAMILIES } from '../models/theme';
import * as tinycolor from 'tinycolor2';
import { Observable, BehaviorSubject } from 'rxjs';
import { internet, company, image, lorem } from "faker";
import { DomSanitizer } from '@angular/platform-browser';
import * as _ from 'lodash';

type StringKVMap = {[key: string]: string};

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  private currentTheme: BehaviorSubject<Theme> = new BehaviorSubject(null);
  constructor(private san: DomSanitizer) {
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

  /**
   * Applies the theme to document.documentElement.style scope.
   * Also scaffold all color variants for each color.
   * @param theme the theme object
   */
  private applyTheme(theme: Theme): void {
    Object.keys(theme.cssRules).forEach(rule => {
      const cssVarName = `--${rule}`;
      const cssRule = theme.cssRules[rule];
      this.registerCssVar(cssVarName, cssRule);
      if (this.isColor(cssVarName)) {
        this.scaffoldColorVariants(cssVarName, cssRule);
      }
    });
  }

  private registerCssVar(name: string, value: string): void {
    // console.log(`registering ${name} = ${value}`);

    document.documentElement.style.setProperty(name, value);
  }

  private isColor(name: string): boolean {
    return name && name.toLowerCase().endsWith('color');
  }

  /**
   * Generates a range of darker, ligher and desaturated
   * variants of a color with variable name `name`,
   * from 10% to 90%, stepping by 10%.
   * Generated variables will be named `${name}{Light|Dark|Desaturated}[10-90]`
   * Also generates a complement and a foreground color to be used
   * when using the base color as background.
   * @param name name of the base color variable
   * @param color base color
   */
  private scaffoldColorVariants(name: string, color: string) {
    const c = tinycolor(color);
    for (let i = 1; i < 10; i++) {
      const lighter = c.clone().lighten(10 * i);
      const darker = c.clone().darken(10 * i);
      const desaturated = c.clone().desaturate(10 * i);
      this.registerCssVar(`${name}Dark${i * 10}`, darker.toHexString());
      this.registerCssVar(`${name}Light${i * 10}`, lighter.toHexString());
      this.registerCssVar(`${name}Desaturated${i * 10}`, desaturated.toHexString());
    }
    const complement = c.clone().complement().toHexString();
    this.registerCssVar(`${name}Complement`, complement);
    let fgVariant = '#ffffff';
    if (c.isLight()) {
      fgVariant = '#000000';
    }
    this.registerCssVar(`${name}Foreground`, fgVariant);
  }

  private randomFontStack(): StringKVMap {
    const [bodyFontFamily, headerFontFamily]: string[] = _(FONT_FAMILIES).sampleSize(2).value();
    return {bodyFontFamily, headerFontFamily};

  }

  /**
   * Returns a random theme object.
   * Normally you would fetch a theme from some backend endpoint.
   * @returns a random theme
   */
  public generateRandomTheme(): Theme {
    let c = tinycolor(internet.color());
    while (c.getLuminance() < 0.3) {
      c = c.lighten();
    }
    const varNames = ['primaryColor', 'secondaryColor', 'tertiaryColor'];

    const cssRules: StringKVMap = c.triad()
      .map(c => c.toHexString())
      .reduce((res, v, i) => {
        res[varNames[i]] = v;
        return res;
      }, this.randomFontStack());


    const t = {
      brandName: company.companyName(),
      brandLogo: this.san.bypassSecurityTrustUrl(image.avatar()),
      name: lorem.slug(),
      enableGithubLink: _.sample([true, false]),
      cssRules
    } as Theme;

    return t;
  }
}
