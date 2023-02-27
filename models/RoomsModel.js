// schema
// 1 user - firstname,lastname,password, email, role,

// roomsSchema
//  { room - number,
//  status,  utilities ,
//  price, }

// bookedRooms schema
// number of booked rooms,checking out,number of booking days,cancelbooking
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
