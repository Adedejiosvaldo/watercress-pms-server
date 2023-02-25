const Users = require("../models/userModel");
const Rooms = require("../models/RoomsModel");
const BookedRooms = require("../models/BookedRooms");
const asyncHandler = require("express-async-handler");
const becrypt = require("becrypt");

//desc: Get all staff
//Method:Get
//Access:Private
const getAllUsers = asyncHandler(async () => {});

//desc: Create a staff
//Method:POST
//Access:Private
const createAUser = asyncHandler(async () => {});

//desc: Update a staff
//Method:Get
//Access:Private
const updateAUser = asyncHandler(async () => {});

//desc: delete a user
//Method:Get
//Access:Private
const deleteAUser = asyncHandler(async () => {});

module.exports = { getAllUsers, createAUser, updateAUser, deleteAUser };
