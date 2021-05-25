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
});

theme = responsiveFontSizes(theme);

export default theme;
