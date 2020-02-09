# Implementing white labeling with angular and css variables

- [Implementing white labeling with angular and css variables](#implementing-white-labeling-with-angular-and-css-variables)
  - [Introduction](#introduction)
  - [Difference between css and sass variables](#difference-between-css-and-sass-variables)
  - [Time to refactor](#time-to-refactor)
  - [Fetching theme details from the backend](#fetching-theme-details-from-the-backend)
  - [Implementing the Angular service that applies the themes.](#implementing-the-angular-service-that-applies-the-themes)
    - [Apply theme](#apply-theme)
    - [Scaffold light, dark and other variants](#scaffold-light-dark-and-other-variants)
  - [Subscribing to the current theme observable to listen for changes](#subscribing-to-the-current-theme-observable-to-listen-for-changes)
  - [Theme directive](#theme-directive)
  - [APP_INITIALIZER](#appinitializer)


## Introduction

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

## Difference between css and sass variables

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

## Time to refactor


## Fetching theme details from the backend

## Implementing the Angular service that applies the themes.

### Apply theme

``` typescript
private registerCssVar(name: string, value: string): void {
    document.documentElement.style.setProperty(name, value);
}
```

### Scaffold light, dark and other variants

``` typescript
public generateShades(name: string, color: string) {
  const c = tinycolor(color);
  for (let i = 1; i < 10; i++) {
    const lighter = c.clone().lighten(10 * i);
    const darker = c.clone().darken(10 * i);

    this.registerCssVar(`${name}Dark${i*10}`, darker.toHexString());
    this.registerCssVar(`${name}Light${i*10}`, lighter.toHexString());
  }
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
## Subscribing to the current theme observable to listen for changes

## Theme directive 

## APP_INITIALIZER

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

``` scss 
:root {
    --primaryColor: #129490;
    --secondaryColor: #70B77E;
    --tertiaryColor: #E0A890;
    --textColor: #041B1B;
}
```

