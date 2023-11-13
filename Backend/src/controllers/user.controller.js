const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

//----->controller for creating new account <signUp>
const createAccountController = async (req, res) => {
  const { username, fullName, password, address, bio } = req.body;

  // validating user data from the form
  if (!username || !fullName || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Provide all the required fields." });
  }

  // checking if the username is already in use
  const duplicateUser = await User.findOne({ username });
  if (duplicateUser)
    return res.status(400).json({
      success: false,
      message: "Username is already in use choose another!",
    });

  // hash the password before storing in the database
  const hashedPassword = await bcrypt.hash(password, 10);

  // creating newUser with the form data
  try {
    const newUser = new User({ username, fullName, password: hashedPassword });
    await newUser.save();
    res
      .status(200)
      .json({ success: true, message: "User created successfully", newUser });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

//----->controller for signIn <Login>
const loginController = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Username and password required." });
  }

  // check is the username is registered in the database or not.
  const registeredUser = await User.findOne({ username });
  if (!registeredUser) {
    return res
      .status(400)
      .json({ success: false, message: "No username matched register first." });
  }

  // check is the password is correct or not.
  const isPasswordCorrect = await bcrypt.compare(
    password,
    registeredUser?.password
  ); // true or false
  if (!isPasswordCorrect) {
    return res
      .status(402)
      .send({ success: false, message: "Incorrect Password." });
  }

  // if the password is correct then generate the token
  const token = generateToken({ username, id: registeredUser?._id });
  res.status(200).json({
    success: true,
    message: "Successfully logged in",
    registeredUser,
    token,
  });
};

//----->get all users controller
const getAllUsersController = async (req, res) => {
  const users = await User.find({});
  return res
    .status(200)
    .json({ success: true, message: "Fetch all user success.", users });
};

module.exports = {
  createAccountController,
  loginController,
  getAllUsersController,
};
