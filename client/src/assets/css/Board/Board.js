import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowX: "hidden",
    overflowY: "scroll",
  },
  title: {
    textTransform: "uppercase",
    fontWeight: 700,
    textAlign: "center",
    padding: "0.5rem",
  },
  tech: {
    background: "#f7f7f7",
    margin: "0.2rem",
    width: "80%",
  },

  rootCold: {
    background: "#3D7AC4",
  },
  rootHot: {
    background: "#C70101",
  },
  rootWarm: {
    background: "#FF9E6A",
  },
  rootPool: {
    background: "#262626",
    width: "50%",
    padding: "1rem",
    marginLeft: "auto",
    marginRight: "auto",
  },
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(0),
    width: "50%",
  },
}));
