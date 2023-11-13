const express = require("express");
const router = express.Router();

const {
  createAccountController,
  loginController,
  getAllUsersController,
} = require("../controllers/user.controller");
const { verifyAuthentication } = require("../middlewares/auth.middleware");

router.post("/create-account", createAccountController);
router.post("/login", loginController);
router.get("/all-users", verifyAuthentication, getAllUsersController);

module.exports = router;
