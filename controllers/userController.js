const Users = require("../models/userModel");
const Rooms = require("../models/RoomsModel");
const BookedRooms = require("../models/BookedRooms");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

//desc: Get all staff
//Method:Get
//Access:Private
const getAllUsers = asyncHandler(async (req, res) => {
  const user = await userModel.find().select("-password").lean();
  if (!user?.length) {
    return res.status(400).json({ message: "No User Found" });
  }
  res.json(user);
});

//desc: Create a staff
//Method:POST
//Access:Private
const createAUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, roles } = req.body;

  if (
    !firstName ||
    !lastName ||
    !password ||
    !email ||
    !roles.length ||
    !Array.isArray(roles)
  ) {
    return res.status(400).json({ message: "All Fields Are Required" });
  }
  //Hash Password
  const hashedPwd = await bcrypt.hash(password, 10);

  //Check For Duplicate
  const duplicate = await Users.findOne({ email }).lean().exec();

  if (duplicate) {
    res.status(409).json({ message: "Duplicate Email Found" });
  }
  //Create User Object
  const userObject = { firstName, lastName, email, password: hashedPwd, roles };

  //create New User
  const user = await Users.create(userObject);
  if (user) {
    res
      .status(201)
      .json({ message: `New User ${firstName} @${email} created` });
  } else {
    res.status(409).json({ message: "Invalid User Details" });
  }
});

//desc: Update a staff
//Method:Get
//Access:Private
const updateAUser = asyncHandler(async (req, res) => {
  const { id, firstName, lastName, email, password, roles } = req.body;

  //confirm data
  if (
    !id ||
    !firstName ||
    !lastName ||
    !email ||
    !roles.length ||
    !Array.isArray(roles)
  ) {
    return res.status(400).json({ message: "All Fields Are Required" });
  }

  const user = await Users.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "User Not Found" });
  }

  //check for duplicates
  const duplicate = await Users.findOne({ email }).lean().exec();
  //UsedStringify because the db wasn't able to convert the duplicate?.id to string
  const stringify = duplicate?._id.toString();
  if (duplicate && stringify !== id) {
    return res.status(409).json({ message: "Duplicate Email" });
  }

  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.roles = roles;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = user.save();
  res.json({ message: `Successfully Updated ${firstName}` });
});

//desc: delete a user
//Method:Get
//Access:Private
const deleteAUser = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }
  const user = await Users.findById(_id).exec();

  if (!user) {
    return res.status(409).json({ message: "User Not Found" });
  }

  const result = await user.deleteOne();
  const reply = `${user.firstName} with Email @ ${user.email}`;
  res.json({ message: `Successfully removed ${reply}` });
});

module.exports = { getAllUsers, createAUser, updateAUser, deleteAUser };
