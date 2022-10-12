const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    CategoryId: {
      type: mongoose.Types.ObjectId,
      ref: "categories",
      required: true,
    },
  },
  { timestamps: true }
);

const Url = new mongoose.model("url", urlSchema);
module.exports = Url;
