import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "2%",
  },
  wall: {
    width: "100%",
    minHeight: "70vh",
  },
  chartsRoot: {
    width: "100%",
    padding: " 0 0.5rem 0 0.5rem",
  },

  filter: {
    padding: "5% 0 5% 0",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },
  chart: {
    margin: "5px 0 5px 0",
    minHeight: "50vh",
  },
  buttons: {
    margin: "5px",
  },
}));
