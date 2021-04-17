import { black, green, grey, red, white } from './colors'

const theme = {
  borderRadius: 12,
  color: {
    black,
    grey,
    primary: {
      light: red[200],
      main: red[500],
    },
    secondary: {
      main: green[500],
    },
    white,
  },
  fontSizes: {
    xxs: '0.625', // 10px
    xs: '1rem',     // 16px
    sm: '1.3125rem', //21 px
    md: '1.75rem',// 28px
    lg: '2.125rem', //36p
    xl: '3.125rem' //50px
  },
  siteWidth: 1700,
  spacing: {
    1: 4,
    2: 8,
    3: 16,
    4: 24,
    5: 32,
    6: 48,
    7: 64,
  },
  topBarSize: 60
}

export default theme