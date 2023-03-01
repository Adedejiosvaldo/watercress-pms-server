const AsyncHandler = require("express-async-handler");
const restaurantModel = require("../models/Resturant");

//Description : Get All Orders
//Method: GET
//Access: Staff
const getAllOrders = AsyncHandler(async (req, res) => {});

//Description : Create an Order
//Method: POST
//Access: Staff
const createAnOrder = AsyncHandler(async (req, res) => {});

//Description : Update an Order
//Method: PATCH
//Access: Staff
const updateAnOrder = AsyncHandler(async (req, res) => {});

//Description : Get All Orders
//Method: GET
//Access: Staff
const cancelAnOrder = AsyncHandler(async (req, res) => {});

module.exports = { createAnOrder, getAllOrders, updateOrder, cancelAnOrder };
