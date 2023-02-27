const Rooms = require("../models/RoomsModel");
const Users = require("../models/userModel");
const { asyncHandler } = require("express-async-handler");

// Description: Get All Rooms
//Method: Get
//Access:Everyone
const getAllRooms = asyncHandler(async((req, res) => {}));

// Description: Create A Room
//Method: POST
//Access: Admin
const createARoom = asyncHandler(async((req, res) => {}));

// Description: Update Room Details
//Method: PATCH
//Access: Admin
const updateRoom = asyncHandler(async((req, res) => {}));

// Description: Delete A Room Details
//Method: Delete
//Access: Admin
const deleteRoom = asyncHandler(async((req, res) => {}));

module.exports = { createARoom, updateRoom, getAllRooms, deleteRoom };
