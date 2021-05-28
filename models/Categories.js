const mongoose = require("mongoose");
const CategoriesSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  color: {
    type: String,
  },
});
module.exports = Categories = mongoose.model("category", CategoriesSchema);
