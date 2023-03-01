const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/resturantController");
router
  .route("/")
  .get(restaurantController.getAllOrders)
  .post(restaurantController.createAnOrder)
  .patch(restaurantController.updateAnOrder)
  .delete(restaurantController.cancelAnOrder);

module.exports = router;
