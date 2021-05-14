const mongoose = require("mongoose");
const WallsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    red: "user",
  },

  hot: {
    type: [String],
  },
  pool: {
    type: [String],
  },
  cold: {
    type: [String],
  },
});

module.exports = Walls = mongoose.model("wall", WallsSchema);
