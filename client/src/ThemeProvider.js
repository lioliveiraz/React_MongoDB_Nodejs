import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const colors = {
  blue: "#51608C",
  brown: "#8C4F2B",
};

let theme = createMuiTheme({
  palette: {
    type: "light",

    common: {
      blue: `${colors.blue}`,
      lightBlue: "#BDBFBF",
      lightBrown: "#BF8756",
      brown: `${colors.brown}`,
    },
    primary: {
      main: `${colors.blue}`,
    },
    secondary: {
      main: `${colors.brown}`,
    },
  },

  typography: {
    fontSize: 15,

    body1: {
      fontSize: 11,
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
