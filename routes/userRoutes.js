const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createAUser)
  .patch(userController.updateAUser)
  .delete(userController.deleteAUser);

module.exports = router;
