import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1A535C",
    },
    secondary: {
      main: "#FEBA33",
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
