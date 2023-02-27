const express = require("express");
const roomController = require("../controllers/roomControllers");
const router = express.Router();

router
  .route("/")
  .get(roomController.getAllRooms)
  .post(roomController.createARoom)
  .patch(roomController.updateRoom)
  .delete(roomController.deleteRoom);

module.exports = router;
