const mongoose = require("mongoose");

const restaurantModel = mongoose.Schema({
  orderedItem: {
    type: String,
    required: true,
  },
  quantityOrdered: {
    type: Number,
    required: true,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
    default: 1000,
  },
});

module.exports = mongoose.model("Restaurant", restaurantModel);
