const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const { cloudinaryUploader } = require("../utils/cloudinary");

//----->controller for creating new account <signUp>
const createAccountController = async (req, res) => {
  const { username, fullName, password, address, bio } = req.body;
  const urlLocalPath = req.files?.url[0]?.path;

  // validating user data from the form
  if (!username || !fullName || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Provide all the required fields." });
  }

  // validating the profile picture
  if (!urlLocalPath) {
    return res
      .status(400)
      .json({ success: false, message: "Avatar is required." });
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

  // upload the profile picture in the cloudinary
  const avatarUrl = await cloudinaryUploader(urlLocalPath);

  // check if the cloudinary url is present or not
  if (!avatarUrl) {
    return res
      .status(400)
      .json({ success: false, message: "Avatar url not present" });
  }

  // creating newUser with the form data
  try {
    const newUser = new User({
      username,
      fullName,
      password: hashedPassword,
      url: avatarUrl.url,
    });
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

//-----> Get single user controller
const getSingleUserController = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "User id required for fetch" });
  }
  const user = await User.findById(id).select({ password: 0 });
  return res
    .status(200)
    .json({ success: true, message: "Get single user success", user });
};

//----->get users with matched username controller
const getUsersWithMatchedUsernameController = async (req, res) => {
  const {username} = req.body;
  if (!username) {
    return res
      .status(400)
      .json({ success: false, message: "Username required for fetch" });
  }
  const users = await User.find({ username: { $regex: username } });
  return res
    .status(200)
    .json({ success: true, message: "Get users with matched username", users });
};

module.exports = {
  createAccountController,
  loginController,
  getAllUsersController,
  getSingleUserController,
  getUsersWithMatchedUsernameController
};
