/* eslint-disable @typescript-eslint/no-empty-interface */
import {
  createTheme,
  ThemeOptions,
  responsiveFontSizes
} from '@mui/material/styles'
import { Theme } from '@mui/material'

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}

const palette: ThemeOptions['palette'] = {
  primary: {
    main: '#4c4d4e',
    dark: '#28387C',
    light: '#647DCC'
  },
  secondary: {
    main: '#ffffff',
    dark: '#C36D18',
    light: '#F09F4F',
    contrastText: '#ffffff'
  },
  info: {
    main: '#3B82F6',
    light: '#2AA3EF'
  },
  grey: {
    600: '#707070',
    800: '#4c4d4e'
  }
}

const typography: ThemeOptions['typography'] = {
  fontFamily: 'Lato, sans-serif',
  h1: {
    fontSize: 50,
    fontWeight: 'bold'
  },
  h2: {
    fontSize: 35,
    fontWeight: 'bold'
  },
  h3: {
    fontSize: 35
  },
  h4: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  body1: {
    fontSize: 20
  },
  body2: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  caption: {
    fontSize: 12
  }
}

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    ...palette
  },
  typography
}

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    ...palette
  },
  typography
}

export const extraColors = {
  primaryVariantOpacity: 'rgb(45, 61, 181, 0.3)',
  secondaryVariantOpacity: 'rgb(237, 174, 109, 0.3)'
}

export default {
  darkTheme: responsiveFontSizes(createTheme(darkThemeOptions)),
  lightTheme: responsiveFontSizes(createTheme(lightThemeOptions))
}
