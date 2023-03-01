const Rooms = require("../models/RoomsModel");
const Users = require("../models/userModel");
const asyncHandler = require("express-async-handler");
// const { find } = require("../models/RoomsModel");

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
  const duplicate = await Rooms.findOne({ roomNumber }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Room Already Exist" });
  }

  const roomObject = {
    roomNumber,
    roomType,
    roomProperties,
  };

  const data = Rooms.create(roomObject);

  res.json({ message: `${roomNumber} successfully created` });
});

// Description: Update Room Details
//Method: PATCH
//Access: Admin
const updateRoom = asyncHandler(async (req, res) => {
  const { id, roomNumber, roomType, roomProperties, role } = req.body;

  //Confirm data
  if (
    !id ||
    !roomNumber ||
    !roomType ||
    !roomProperties ||
    !Array.isArray(role)
  ) {
    return res.status(400).json({ message: "Fields Are Required" });
  }

  //search for room
  const room = await Rooms.findById(id).exec();

  //when no room is found
  if (!room) {
    return res.status(400).json({ message: "No Rooms Found" });
  }

  //check for duplicate
  const duplicate = await Rooms.findOne({ roomNumber }).lean().exec();

  //   const stringify = await ;
  //allows update to only original user
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate roomNumber" });
  }

  //updates the data
  room.roomNumber = roomNumber;
  room.roomType = roomType;
  room.roomProperties = roomProperties;

  //saves the Updated data
  const updatedRooms = await room.save();

  //response to the request
  res.json({
    message: `Information:Room ${roomNumber} data has been changed`,
  });
});

// Description: Delete A Room Details
//Method: Delete
//Access: Admin
const deleteRoom = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  //Find UserRoles
  const userRoles = await Users.findOne({ role: id }).lean().exec();

  //check if user us admin
  if (userRoles.toString() === "admin") {
    return res.status(400).json({ message: "User is admin" });
  }

  //find Room
  const room = await Rooms.findById(_id).exec();

  //No room matches ID
  if (!room) {
    return res.status(400).json({ message: "No Room Found" });
  }

  //delete the room
  const result = await Rooms.deleteOne(room);

  //response to server
  res.json({ message: `${room.roomNumber} deleted successfully` });
});

module.exports = { createARoom, updateRoom, getAllRooms, deleteRoom };
