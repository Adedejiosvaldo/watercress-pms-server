const AsyncHandler = require("express-async-handler");
const Restaurant = require("../models/Resturant");

//Description : Get All Orders
//Method: GET
//Access: Staff
const getAllOrders = AsyncHandler(async (req, res) => {
  const orders = await Restaurant.find().lean();

  if (!orders.length) {
    return res.status(400).json({ message: "No Orders" });
  }

  res.json(orders);
});

//Description : Create an Order
//Method: POST
//Access: Staff
const createAnOrder = AsyncHandler(async (req, res) => {
  const { orderedItem, quantityOrdered, price } = req.body;

  //check for data
  if (!orderedItem || !quantityOrdered || !price) {
    return res.status(400).json({ message: "All Fields Are Required" });
  }

  const orderObject = { orderedItem, quantityOrdered, price };
  const data = Restaurant.create(orderObject);
  res.json({ message: "Order Created Successfully" });
});

//Description : Update an Order
//Method: PATCH
//Access: Staff
const updateAnOrder = AsyncHandler(async (req, res) => {
  const { id, orderedItem, quantityOrdered, price } = req.body;

  //confirm data
  if (!id || !orderedItem || !quantityOrdered || !price) {
    return res.status(400).json({ message: "All Fields Are Required" });
  }

  const order = await Restaurant.findById({ _id: id }).exec();
  if (!order) {
    return res.status(400).json({ message: "No Such Order Exists" });
  }

  order.orderedItem = orderedItem;
  order.quantityOrdered = quantityOrdered;
  order.price = price;

  const updatedOrder = await order.save();
  res.json({
    message: `Order For ${order.orderedItem} with id: ${id} updated successfully `,
  });
});

//Description : Get All Orders
//Method: GET
//Access: Staff
const cancelAnOrder = AsyncHandler(async (req, res) => {
  const { id } = req.body;
  const order = await Restaurant.findById({ _id: id }).lean().exec();

  if (!order) {
    return res.status(409).json({ message: "Cant delete no-existent order" });
  }

  const removeOrder = await Restaurant.deleteOne(order);
  res.json({
    message: `Order ${id} of ${order.orderedItem} deleted successfully`,
  });
});

module.exports = { createAnOrder, getAllOrders, updateAnOrder, cancelAnOrder };
