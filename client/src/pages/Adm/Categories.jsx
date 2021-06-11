import React, { useEffect, useState } from "react";
import {
  getCategories,
  updateCategories,
} from "./../../store/actions/categories";
import { connect } from "react-redux";
import colors from "../../assets/colors.json";
import { toast } from "react-toastify";
import CreateCategoryForm from "../../components/Category/CreateCategoryForm";
import { Grid, InputLabel, Select } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./../../assets/css/Categories/categories";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { capitalize } from "./../../helpers/services";

function Categories({
  token,
  getCategories,
  updateCategories,
  category: { categories, loading, status, errors },
}) {
  const [colorID, setColorID] = useState("60b4967d53188851a4beb8e2");
  const classes = useStyles();

  useEffect(() => {
    getCategories(token);
    if (errors) {
      toast.error(errors);
    }
    if (status) {
      toast.success(status);
    }
  }, [status, getCategories, token, errors]);

  const updateCategoryColor = async (e) => {
    const color = e.target.value;
    updateCategories(colorID, color, token);
    setColorID(null);
  };

  if (loading) return <p>Loading</p>;

  return (
    <Grid container className={classes.root} justify="center" align="center">
      <Grid item className={classes.main} xs={10}>
        {categories.map(({ _id, name, color }) => (
          <Grid
            item
            key={_id}
            style={{ background: color }}
            className={classes.categoryField}
          >
            <Typography variant="body2" className={classes.categoryName}>
              {capitalize(name)}
            </Typography>
            {colorID === _id ? (
              <Grid item className={classes.select}>
                <InputLabel id="demo-simple-select-filled-label">
                  Color
                </InputLabel>

                <Select
                  variant="filled"
                  id="demo-simple-select-filled"
                  name="colors"
                  value={colorID}
                  id=""
                  onChange={updateCategoryColor}
                  className={classes.selectField}
                >
                  {colors.map(({ hexString, name, colorId }) => (
                    <MenuItem
                      key={colorId}
                      style={{ background: hexString, color: "white" }}
                      value={hexString}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            ) : (
              <IconButton
                onClick={() => setColorID(_id)}
                data-cy="navbar-menu-button"
                className={classes.icon}
              >
                <EditIcon />
              </IconButton>
            )}
          </Grid>
        ))}
      </Grid>

      <Grid item xs={12}>
        <CreateCategoryForm />
      </Grid>
    </Grid>
  );
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    category: state.category,
  };
};
export default connect(mapStateToProps, { getCategories, updateCategories })(
  Categories
);
