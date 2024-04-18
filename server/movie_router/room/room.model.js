const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const instanceSchema = new Schema(
  {
    nameRoom: { type: String },
    codeRoom: { type: String },
    row: { type: Number },
    column: { type: Number },
    address: { type: String },
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

const ProductModel = mongoose.model("movie___room", instanceSchema);
module.exports = ProductModel;
