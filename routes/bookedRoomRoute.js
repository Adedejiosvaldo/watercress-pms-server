const express = require("express");
const router = express.Router();
const bookedRoomController = require("../controllers/BookedRoomController");
router
  .route("/")
  .get(bookedRoomController.getAllBookings)
  .post(bookedRoomController.bookAGuest)
  .patch(bookedRoomController.updateBooking)
  .delete(bookedRoomController.cancelABooking);

module.exports = router;
// bookAGuest, updateBooking, cancelABooking, getAllBookings;
