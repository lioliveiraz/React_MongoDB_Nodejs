import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    overflow: "hidden",
    background: "#f1f1f1",
    padding: "1rem",
  },
  title: {
    width: "100%",
    padding: "0.2rem",
    textTransform: "capitalize",
    fontWeight: "700",
  },
  svgWrapper: {
    minHeight: "90%",
    width: "100%",
    overflow: "scroll",
    paddingTop: "1rem",
    paddingBottom: "1rem",
  },
  svg: {
    width: "100%",
    height: "100%",
  },
}));
