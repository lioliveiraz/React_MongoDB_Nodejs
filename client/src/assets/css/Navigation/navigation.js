import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.3rem",
  },
  menu: {},

  links: {
    textTransform: "capitalize",
    cursor: "pointer",
  },
}));
