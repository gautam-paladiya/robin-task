const mongoose = require("mongoose");

var ProductModelSchema = mongoose.Schema(
  {
    name: String,
    image: String,
    quantity: Number,
    price: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductModelSchema);
