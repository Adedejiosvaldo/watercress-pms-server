const Rooms = require("../models/RoomsModel");
const Users = require("../models/userModel");
const asyncHandler = require("express-async-handler");

// Description: Get All Rooms
//Method: Get
//Access:Everyone
const getAllRooms = asyncHandler(async (req, res) => {
  const room = await Rooms.find().lean();

  if (!room?.length) {
    return res.status(400).json({ message: "No Rooms Found" });
  }
  res.json(room);
});
// Description: Create A Room
//Method: POST
//Access: Admin
const createARoom = asyncHandler(async (req, res) => {
  const { roomNumber, roomType, roomProperties, role } = req.body;
  if (
    !roomNumber ||
    !Array.isArray(roomType) ||
    !roomType.length ||
    !roomProperties.length ||
    !Array.isArray(roomProperties)
  ) {
    return res.status(400).json({ message: "All Fields are required" });
  }
  console.log(role);
  const duplicate = await Rooms.findOne({ roomNumber }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Room Already Exist" });
  }

  const roomObject = {
    roomNumber,
    roomType,
    role,
    roomProperties,
  };

  const data = Rooms.create(roomObject);

  res.json({ message: `${roomNumber} successfully created` });
});

// Description: Update Room Details
//Method: PATCH
//Access: Admin
const updateRoom = asyncHandler(async (req, res) => {});

// Description: Delete A Room Details
//Method: Delete
//Access: Admin
const deleteRoom = asyncHandler(async (req, res) => {});

module.exports = { createARoom, updateRoom, getAllRooms, deleteRoom };
