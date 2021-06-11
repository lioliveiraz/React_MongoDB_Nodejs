import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  form: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    height: "20vh",
    padding: "1rem",
  },
  errorMessage: {
    color: "red",
  },
  input: {
    margin: "0.2rem",
  },
  button: {
    margin: "0.4rem",
  },
}));
