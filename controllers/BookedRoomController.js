const BookedRooms = require("../models/BookedRooms");
const asyncHandler = require("express-async-handler");

//Description:get All Booked guest
//Method:GET
//Access:Private

const getAllBookings = asyncHandler(async (req, res) => {
  const booking = await BookedRooms.find().lean();

  if (!booking) {
    return res.status(400).json({ message: "No User Found" });
  }
  res.json(booking);
});

//Description:book a Guest
//Method:POST
//Access:Private
const bookAGuest = asyncHandler(async (req, res) => {});

//Description:update a guest details
//Method:PATCH
//Access:Private
const updateBooking = asyncHandler(async (req, res) => {});

//Description:cancel a booking
//Method:POST
//Access:Private
const cancelABooking = asyncHandler(async (req, res) => {});

module.exports = { bookAGuest, updateBooking, cancelABooking, getAllBookings };
