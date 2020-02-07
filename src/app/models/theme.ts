export interface Theme {
  name: string;
  brandName: string;
  brandLogo?: string;
  cssRules: { [key: string]: string };
}


export const DEFAULT_THEME = {
  name: 'default-theme',
  brandName: 'SuperBrand',
  brandLogo: '//getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg', //'//upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Hacker_Inside_Logo.svg/1200px-Hacker_Inside_Logo.svg.png',
  cssRules: {
    primaryColor: '#129490',
    secondaryColor: '#70B77E',
    tertiaryColor: '#E0A890',
    textColor: '#041B1B'
  }
} as Theme;

export const ALTERNATE_THEME = {
name: 'alternate-theme',
  brandName: 'Another Brand',
  brandLogo: '//upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Hacker_Inside_Logo.svg/1200px-Hacker_Inside_Logo.svg.png',
  cssRules: {
    primaryColor: '#856A5D',
    secondaryColor: '#CCC9E7',
    tertiaryColor: '#6C6F7D',
    textColor: '#312722'
  }

} as Theme;
