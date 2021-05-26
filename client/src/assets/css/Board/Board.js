import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    color: "white",

    overflowX: "hidden",
    overflowY: "scroll",
  },
  title: {
    textTransform: "uppercase",
    fontWeight: 700,
    textAlign: "center",
    padding: "0.3rem",
  },
  tech: {
    background: "#f7f7f7",
    margin: "0.2rem",
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
}));
