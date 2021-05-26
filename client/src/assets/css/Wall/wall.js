import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    padding: "1.3rem 0 1.3rem 0",
    height: "100%",
    width: "100%",
    overflowX: "hidden",
    margin: "0",
  },

  wall: {
    background: "#F8F8F8",
    display: "flex",
    minWidth: "90%",
    minHeight: "50vh",
    maxHeight: "80%",
    justifyContent: "center",
    paddingTop: "1.5rem",
    paddingBottom: "1.5rem",
  },
  column: {
    minWidth: "30%",
    margin: "0.2rem",
  },
  pool: {
    width: "100%",
  },
}));