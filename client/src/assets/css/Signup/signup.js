import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    background: "#BDBFBF",
  },
  main: {
    height: "70%",
    width: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    background: "white",
    margin: "auto",
  },
  title: {
    padding: "1rem",
    fontWeight: "700",
  },
  inputs: {
    padding: "0.3rem",
  },
}));
