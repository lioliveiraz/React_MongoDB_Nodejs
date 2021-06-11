import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    background: "#BDBFBF",
  },
  form: {
    margin: "auto",
    height: "80%",
  },
  title: {
    padding: "1rem",
    fontWeight: "bold",
  },

  paper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  input: {
    padding: "0.3rem",
  },
  select: {
    width: "80%",
  },
}));
