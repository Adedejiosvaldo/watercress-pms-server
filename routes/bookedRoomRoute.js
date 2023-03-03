const express = require("express");
const router = express.Router();
const bookedRoomController = require("../controllers/BookedRoomController");
router
  .route("/")
  .get(bookedRoomController.getAllOrders)
  .post(bookedRoomController.createAnOrder)
  .patch(bookedRoomController.updateAnOrder)
  .delete(bookedRoomController.cancelAnOrder);

module.exports = router;
