const BookedRooms = require("../models/BookedRooms");
const asyncHandler = require("express-async-handler");
const RoomsModel = require("../models/RoomsModel");

//Description:get All Booked guest
//Method:GET
//Access:Private

const getAllBookings = asyncHandler(async (req, res) => {
  const booking = await BookedRooms.find().lean();

  if (!booking?.length) {
    return res.status(400).json({ message: "No User Found" });
  }
  res.json(booking);
});

//Description:book a Guest
//Method:POST
//Access:Private
const bookAGuest = asyncHandler(async (req, res) => {
  const { id, checkInDate, checkOutDate, status } = req.body;
  const getRoomNumber = await RoomsModel.findById(id)
    .lean()
    .populate("roomNumber")
    .select("roomNumber -_id")
    .exec();

  if (!checkInDate || !checkOutDate || Array.isArray(status)) {
    return res.status(400).json({ message: "All fields are required" });
  }

  status.map((room) => {
    if (
      room.toString().toLowerCase !== "empty".toLowerCase() ||
      room.toString().toLowerCase !== "Out Of Order".toLowerCase()
    ) {
      return res.status(409).json({ message: "Room Is Already Occupied" });
    }
  });

  const bookedRoom = {
    getRoomNumber,
    status,
    checkInDate,
    checkOutDate,
  };

  const newBooking = BookedRooms.create(bookedRoom);
  res.json({ message: `Successfully booked ${getRoomNumber}` });
});

//Description:update a guest details
//Method:PATCH
//Access:Private
const updateBooking = asyncHandler(async (req, res) => {});

//Description:cancel a booking
//Method:POST
//Access:Private
const cancelABooking = asyncHandler(async (req, res) => {});

module.exports = { bookAGuest, updateBooking, cancelABooking, getAllBookings };
