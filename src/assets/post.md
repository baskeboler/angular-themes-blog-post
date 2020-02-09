
- [Introduction](#introduction)
- [Difference between css and sass variables](#difference-between-css-and-sass-variables)
- [Time to refactor](#time-to-refactor)
  - [Our theme model](#our-theme-model)
- [Fetching theme details from the backend](#fetching-theme-details-from-the-backend)
- [Implementing the Angular service that applies the themes.](#implementing-the-angular-service-that-applies-the-themes)
  - [Apply theme](#apply-theme)
  - [Scaffold light, dark and other variants](#scaffold-light-dark-and-other-variants)
- [Subscribing to the current theme observable to listen for changes](#subscribing-to-the-current-theme-observable-to-listen-for-changes)
- [Theme directive](#theme-directive)
- [APP_INITIALIZER](#appinitializer)
- [References](#references)


# Introduction

A very common task in web development is doing white labeling. Usually you start off adding a theme or two to your application, you set some wrapper class name in a container element and you add a block of sass in your styles and customize under that class.



```html
<div class="container my-theme">

  <!-- my app content -->
</div>
```

Your theme sass file may look something like __this__: 

```scss
// .. some imports  

.my-theme {
  $primary-color: #121212;
  $secondary-color: #ededed;
  // .. set all your variables

  @import 'generic-styles.scss';

  // You will probably end up adding custom snippets for specific themes.

  .analytics-section { 
    display: none;
  }
}

```

If you planned from the start to support white labeling then you probably wrote all the 
style rules using the relevant sass variables that you will later override.

After implementing more than 2 or 3 themes you will start noticing that this can get really messy. You will also notice that your css will have a lot of redundant code and the more themes you have, the more css code you will bundle with your application. Also, you will be loading all the themes css even though you will only use 1 theme.

Needless to say, this will not scale if we plan to support 

# Difference between css and sass variables

Sass variables get resolved at compile time, once your styles are compiled into CSS, they are replaced with actual values which you can no longer change at runtime. 

On the other hand, CSS variables can be changed at runtime after your page is loaded.  You could set a variable to a certain value as in the following snippet:

``` typescript 
document.documentElement.style.setProperty('--myCssVariable', '#9efefe');
```
And your styles should reference the variable in some rules:

```scss 
.some-class {
  color: var(--myCssVariable);
}
```
Once you set the css variable to some value, your view should immediately 

# Time to refactor

- Remove all theme wrapper css code blocks. 
- Replace all preprocessor variables with css vars in the form `var(--myVarName)`
  - Sometimes you can do something like this:
    ```scss 
    $mySassVariable: var(--myCssVariable);
    ```
    This will not work if that SASS variable is later used with SASS functions (for example the `mix()` color function), but if you aren't passing that var through functions that expect a resolved value you should be ok. 
- If you do make use of SASS color functions to obtain darker or lighter variant of your main colors, you may generate those from javascript at the time you load your theme.
  - I am using a small library called [tinycolor](https://github.com/bgrins/TinyColor) in my example which is very simple to use 
## Our theme model 

There are some things to note about themes, as part of our themes we will customize:
- CSS styles:
  - mostly made up of our styles referring to CSS vars that we will include in some entity. 
- Content
  - Things we can't customize with CSS, for example: titles, custom footers, hiding/showing elements based on the theme, etc.

Here is an example theme model for demo application:

```ts
export interface Theme {
  name: string;
  brandName: string;
  enableGithubLink?: boolean;
  brandLogo?: string;
  cssRules: { [key: string]: string };
}
```
# Fetching theme details from the backend

# Implementing the Angular service that applies the themes.

## Apply theme

``` typescript
private registerCssVar(name: string, value: string): void {
    document.documentElement.style.setProperty(name, value);
}
```

## Scaffold light, dark and other variants

``` typescript
  
  /**
   * Generates a range of darker, ligher and desaturated 
   * variants of a color with variable name `name`, 
   * from 10% to 90%, stepping by 10%.
   * Generated variables will be named `${name}{Light|Dark|Desaturated}[10-90]`.
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
```


``` scss 
// variables generated at runtime when theme is loaded
:root {
  --primaryColor:#129490;
  --primaryColorDark10:#0c6664;
  --primaryColorDark20:#073937;
  --primaryColorDark30:#010c0b;
  --primaryColorDark40:#000000;
  --primaryColorDark50:#000000;
  --primaryColorDark60:#000000;
  --primaryColorDark70:#000000;
  --primaryColorDark80:#000000;
  --primaryColorDark90:#000000;
  --primaryColorLight10:#18c1bc;
  --primaryColorLight20:#27e5df;
  --primaryColorLight30:#55eae6;
  --primaryColorLight40:#82f0ec;
  --primaryColorLight50:#b0f5f3;
  --primaryColorLight60:#ddfbfa;
  --primaryColorLight70:#ffffff;
  --primaryColorLight80:#ffffff;
  --primaryColorLight90:#ffffff;
  --secondaryColor:#70B77E;
  --secondaryColorDark10:#52a262;
  --secondaryColorDark20:#41804d;
  --secondaryColorDark30:#305e39;
  --secondaryColorDark40:#1e3d24;
  --secondaryColorDark50:#0d1b10;
  --secondaryColorDark60:#000000;
  --secondaryColorDark70:#000000;
  --secondaryColorDark80:#000000;
  --secondaryColorDark90:#000000;
  --secondaryColorLight10:#92c89d;
  --secondaryColorLight20:#b4d9bb;
  --secondaryColorLight30:#d6eada;
  --secondaryColorLight40:#f8fbf8;
  --secondaryColorLight50:#ffffff;
  --secondaryColorLight60:#ffffff;
  --secondaryColorLight70:#ffffff;
  --secondaryColorLight80:#ffffff;
  --secondaryColorLight90:#ffffff;
  --tertiaryColor:#E0A890;
  --tertiaryColorDark10:#d58968;
  --tertiaryColorDark20:#ca6940;
  --tertiaryColorDark30:#a8532f;
  --tertiaryColorDark40:#804024;
  --tertiaryColorDark50:#582c19;
  --tertiaryColorDark60:#30180e;
  --tertiaryColorDark70:#090402;
  --tertiaryColorDark80:#000000;
  --tertiaryColorDark90:#000000;
  --tertiaryColorLight10:#ebc7b8;
  --tertiaryColorLight20:#f6e6e0;
  --tertiaryColorLight30:#ffffff;
  --tertiaryColorLight40:#ffffff;
  --tertiaryColorLight50:#ffffff;
  --tertiaryColorLight60:#ffffff;
  --tertiaryColorLight70:#ffffff;
  --tertiaryColorLight80:#ffffff;
  --tertiaryColorLight90:#ffffff;
  --textColor:#041B1B;
  --textColorDark10:#000000;
  --textColorDark20:#000000;
  --textColorDark30:#000000;
  --textColorDark40:#000000;
  --textColorDark50:#000000;
  --textColorDark60:#000000;
  --textColorDark70:#000000;
  --textColorDark80:#000000;
  --textColorDark90:#000000;
  --textColorLight10:#0b4747;
  --textColorLight20:#117474;
  --textColorLight30:#18a0a0;
  --textColorLight40:#1ecdcd;
  --textColorLight50:#3ce2e2;
  --textColorLight60:#68e9e9;
  --textColorLight70:#95efef;
  --textColorLight80:#c1f6f6;
  --textColorLight90:#eefcfc;
}
```
# Subscribing to the current theme observable to listen for changes

# Theme directive 

# APP_INITIALIZER

```ts 
@Injectable({
  providedIn: 'root'
})
export class ThemesInitService {

  constructor(private themes: ThemesService) { }

  public init(): Promise<void> {
    // We need to return a promise
    return new Promise((resolve, reject) => {
      console.log('Initializing themes');

      this.themes.setCurrentTheme(DEFAULT_THEME);
      resolve();
    });
  }
}
```

```typescript
export const initThemes = (themes: ThemesInitService) => {
  return (): Promise<any> => themes.init();
}
```

```ts
 {
  // @NgModule declaration
 
  providers: [
    ThemesService,
    {
      provide: APP_INITIALIZER,
      useFactory: initThemes,
      deps: [ThemesInitService],
      multi: true
    }
  ],

 }
```

# References

- [https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [css-tricks post about the differences between css and preprocessor variables](https://css-tricks.com/difference-between-types-of-css-variables/)
