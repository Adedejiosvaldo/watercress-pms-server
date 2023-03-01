const mongoose = require("mongoose");
const roomSchema = mongoose.Schema({
  roomNumber: {
    type: Number,
    required: true,
  },
  roomType: [
    {
      type: String,
      required: true,
    },
  ],
  roomProperties: [
    {
      type: String,
      default: "Free Internet",
    },
  ],

  role: {
    type: mongoose.Types.ObjectId,

    ref: "User",
  },
});
module.exports = mongoose.model("Rooms", roomSchema);
