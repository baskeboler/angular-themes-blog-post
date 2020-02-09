export interface Theme {
  name: string;
  brandName: string;
  enableGithubLink?: boolean;
  brandLogo?: string;
  cssRules: { [key: string]: string };
}

export const FONT_FAMILIES = [
  "'Cormorant Garamond', serif",
  "'Proza Libre', sans-serif",
  "'Libre Franklin', sans-serif",
  "'Libre Baskerville', serif",
  "'Trirong', serif",
  "'Rubik', sans-serif",
  "'Work Sans', sans-serif",
  "'Taviraj', serif",
  "'Eczar', serif",
  "'Gentium Basic', serif"
  ]
export const DEFAULT_THEME = {
  name: 'default-theme',
  brandName: 'SuperBrand',
  enableGithubLink: true,
  brandLogo: '//getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg', //'//upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Hacker_Inside_Logo.svg/1200px-Hacker_Inside_Logo.svg.png',
  cssRules: {
    primaryColor: '#129490',
    secondaryColor: '#70B77E',
    tertiaryColor: '#E0A890',
    textColor: '#041B1B',
    headerFontFamily: FONT_FAMILIES[0],
    bodyFontFamily: FONT_FAMILIES[1]
  }
} as Theme;

export const ALTERNATE_THEME = {
name: 'alternate-theme',
  brandName: 'Another Brand',
  enableGithubLink: true,
  brandLogo: '//upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Hacker_Inside_Logo.svg/1200px-Hacker_Inside_Logo.svg.png',
  cssRules: {
    primaryColor: '#856A5D',
    secondaryColor: '#CCC9E7',
    tertiaryColor: '#6C6F7D',
    textColor: '#312722',
    headerFontFamily: FONT_FAMILIES[2],
    bodyFontFamily: FONT_FAMILIES[3]
  }
} as Theme;
