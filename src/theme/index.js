import { black, white } from "./colors";

const theme = {
  borderRadius: 4,
  bgColor: "#090909",
  fontColor: {
    white,
    gray: "#5c5c5c",
  },
  color: {
    red: "#fa423e",
    blue: "#20a4fc",
    yellow: "#fde404",
    green: "#68c12f",
    pink: "#DD4591",
    gray: "#666",
    lightgray: "#888",
    box: "#181818",
    boxBorder: "#262626",
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
    xxs: "0.625rem", // 10px
    xs: "1rem", // 16px
    sm: "1.3125rem", //21 px
    md: "1.75rem", // 28px
    lg: "2.125rem", //36p
    xl: "3.125rem", //50px
  },
  siteWidth: 1440,
  homeWidth: 1200,
  spacing: {
    1: 4,
    2: 8,
    3: 16,
    4: 24,
    5: 32,
    6: 48,
    7: 64,
    8: 96,
  },
  topBarSize: 60,
};

export default theme;
