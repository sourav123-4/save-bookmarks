const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    urlId: {
      type: mongoose.Types.ObjectId,
      ref: "url",
    },
  },
  { timestamps: true }
);

const Category = new mongoose.model("categories", categorySchema);
module.exports = Category;
