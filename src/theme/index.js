import { black, white, green, grey, blue, red, yellow } from './colors'

const theme = {
  borderRadius: 16,
  bgColor: "#131313",
  boxColor: "#181818",
  boxBorderColor: "#262626",
  fontColor: {
    white,
    gray: "#5c5c5c",
  },
  color: {
    red: "#fa423e",
    blue: "#20a4fc",
    yellow: "#fde404",
    green: "#68c12f",
    gray: "#5c5c5c",
    lightgray: "#888",
    white,
    black,
    // primary: {
    //   light: red[200],
    //   main: red[500],
    // },
    // secondary: {
    //   main: green[500],
    // },
  },
  fontSizes: {
    xxs: '0.625rem', // 10px
    xs: '1rem',     // 16px
    sm: '1.3125rem', //21 px
    md: '1.75rem',// 28px
    lg: '2.125rem', //36p
    xl: '3.125rem' //50px
  },
  siteWidth: 1440,
  spacing: {
    1: 4,
    2: 8,
    3: 16,
    4: 24,
    5: 32,
    6: 48,
    7: 64,
  },
  topBarSize: 70
}

export default theme