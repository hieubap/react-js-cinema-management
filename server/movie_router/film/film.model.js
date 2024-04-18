const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const instanceSchema = new Schema(
  {
    // owner: { type: String, required: true },
    nameFilm: { type: String },
    codeFilm: { type: String },
    duration: { type: Number },
    balance: { type: Number },
    type: { type: Array },
    imageUrl: { type: String },
    content: { type: String },
  },
  {
    // _id: false,
    autoIndex: true,
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const ProductModel = mongoose.model("movie___film", instanceSchema);
module.exports = ProductModel;
