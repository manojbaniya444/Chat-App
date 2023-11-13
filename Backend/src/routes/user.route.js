const express = require("express");
const router = express.Router();

const {
  createAccountController,
  loginController,
} = require("../controllers/user.controller");

router.post("/create-account", createAccountController);
router.post("/login", loginController);

module.exports = router;
