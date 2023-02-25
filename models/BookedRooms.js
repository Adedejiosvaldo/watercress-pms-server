const mongoose = require("mongoose");

const bookedSchema = mongoose.Schema({
  roomNumber: {
    type: mongoose.Types.ObjectId,
    ref: "Rooms",
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  status: [
    {
      type: String,
      default: "empty",
    },
  ],
});
