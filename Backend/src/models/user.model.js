const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "Username must be unique!"],
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      required: [true, "Password must required!"],
      type: String,
    },
    // file upload will be available soon
    url: {
      type: String,
    },
    address: {
      type: String,
    },
    bio: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
