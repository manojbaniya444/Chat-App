const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection to database successful.");
  } catch (error) {
    console.log("Connect to database error: ", error);
    process.exit(1);
  }
};

module.exports = connectToDb;
