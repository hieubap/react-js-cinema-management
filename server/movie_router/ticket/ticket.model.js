const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const instanceSchema = new Schema(
  {
    timetableId: { type: String },
    fullname: { type: String },
    phone: { type: String },
    address: { type: String },
    email: { type: String },
    positions: { type: Array },
    methodPay: { type: Number, default: 1 },
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

const ProductModel = mongoose.model("movie___ticket", instanceSchema);
module.exports = ProductModel;
