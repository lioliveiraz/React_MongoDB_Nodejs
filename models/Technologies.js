const mongoose = require("mongoose");
const TechnologiesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  like: {
    type: Number,
  },
  unlike: {
    type: Number,
  },
  category: {
    type: String,
  },
  creator: {
    type: String,
  },
  date: {
    type: Date,
  },
});

module.exports = Technologies = mongoose.model(
  "technology",
  TechnologiesSchema
);
