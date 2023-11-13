const jwt = require("jsonwebtoken");

const verifyAuthentication = async (req, res, next) => {
  // getting the Bearer token from the header
  const bearerToken = req.headers.authorization;
  const token = bearerToken.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // authentication failed message after auth failed
    if (!decoded) {
      return res
        .status(402)
        .json({ success: false, message: "User not authenticated." });
    }

    // save the user details in the req after successful authentication
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

module.exports = { verifyAuthentication };
