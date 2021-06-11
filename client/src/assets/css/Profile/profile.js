import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: "#BDBFBF",
    height: "100vh",
  },
  main: {
    height: "80%",
    margin: "auto",
  },
  title: {
    fontWeight: "bold",
    padding: "1rem",
  },
  paper: {
    height: "100%",
    width: "100%",
    overflow: "scroll",
  },
  input: {
    padding: "0.3rem",
  },
  select: {
    width: "80%",
  },
  button: {
    margin: "0.1rem",
  },
}));
