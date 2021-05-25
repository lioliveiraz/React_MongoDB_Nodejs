import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: "#1A535C",
    color: "white",
    padding: "0.7rem",
  },
  subnav: {},
  links: { color: "white" },
  button: {
    position: "relative",
    right: "50%",
  },
}));
