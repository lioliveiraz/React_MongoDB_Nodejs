import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100%",
    background: "#51608C",
  },
  main: {
    height: "75%",
    padding: "10px",
  },
  paper: {
    height: "100%",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    background: "#F1F1F1",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  image: {
    height: "15%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    height: "50%",
    margin: "5%",
  },
  input: {
    padding: "1rem",
  },
  button: {
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "5%",
  },
}));
