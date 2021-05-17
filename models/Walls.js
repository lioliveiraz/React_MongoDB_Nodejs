const mongoose = require("mongoose");
const WallsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    red: "user",
  },

  hot: {
    type: [Object],
  },
  pool: {
    type: [Object],
  },
  cold: {
    type: [Object],
  },
});

module.exports = Walls = mongoose.model("wall", WallsSchema);
