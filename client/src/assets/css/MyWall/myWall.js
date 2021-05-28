import { makeStyles } from "@material-ui/core/styles";

export const useStylesMyWall = makeStyles((theme) => ({
  root: {
    width: "100%",
    minHeight: "100vh",
    overflow: "hidden",
  },
  paper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  columns: {
    width: "90%",
    marginTop: "10px",
  },
  columnsName: {
    textAlign: "center",
    textTransform: "uppercase",
    color: "white",
  },
  list: {
    width: "80%",
    margin: "0 auto 0 auto",
    padding: "5px",
  },
}));
