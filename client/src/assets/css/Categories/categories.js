import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  main: {
    marginTop: "2rem",
  },
  categoryField: {
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0.2rem",
    padding: "0.5rem",
  },
  icon: {
    color: "white",
  },
  categoryName: {
    padding: "1rem",
  },
  select: {
    background: "white",
  },
}));
