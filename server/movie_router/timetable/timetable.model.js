const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const instanceSchema = new Schema(
  {
    filmId: { type: String },
    roomId: { type: String },
    startAt: { type: Date },
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

const ProductModel = mongoose.model("movie___timetable", instanceSchema);
module.exports = ProductModel;
