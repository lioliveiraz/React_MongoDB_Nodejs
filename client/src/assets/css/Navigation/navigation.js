import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    background: "#1A535C",
    padding: "0.3rem",
  },
  menu: {},

  links: {
    textTransform: "capitalize",
    color: "#1A535C",
    cursor: "pointer",
  },
}));
