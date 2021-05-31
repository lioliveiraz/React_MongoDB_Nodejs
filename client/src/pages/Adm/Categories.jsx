import React, { useEffect, useState } from "react";
import {
  getCategories,
  updateCategories,
} from "./../../store/actions/categories";
import { connect } from "react-redux";
import colors from "../../assets/colors.json";
import { toast } from "react-toastify";
import CreateCategoryForm from "../../components/Category/CreateCategoryForm";

function Categories({
  token,
  getCategories,
  updateCategories,
  category: { categories, loading, status, errors },
}) {
  const [colorID, setColorID] = useState();

  useEffect(() => {
    getCategories(token);
    if (errors) {
      toast.error(errors);
    }
    if (status) {
      toast.success(status);
    }
  }, [status, getCategories, token]);

  const updateCategoryColor = async (e) => {
    const color = e.target.value;
    try {
      await updateCategories(colorID, color, token);
      setColorID(null);
    } catch (error) {
      toast.error(errors);
    }
  };

  if (loading) return <p>Loading</p>;

  return (
    <div>
      {categories.map(({ _id, name, color }) => (
        <div key={_id}>
          <p style={{ background: color, color: "white" }}>{name}</p>
          <p onClick={() => setColorID(_id)}>Edit</p>
        </div>
      ))}
      {colorID && (
        <>
          <select name="colors" id="" onChange={updateCategoryColor}>
            <option value="white">Select Color</option>
            {colors.map(({ hexString, name, colorId }) => (
              <option
                key={colorId}
                style={{ background: hexString, color: "white" }}
                value={hexString}
              >
                {name}
              </option>
            ))}
          </select>
        </>
      )}
      <CreateCategoryForm />
    </div>
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
