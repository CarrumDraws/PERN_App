const jwt = require("jsonwebtoken");
require("dotenv").config();

// Authenticates Token (Call before every route after Authentication)
module.exports = async (req, res, next) => {
  try {
    const token = req.header("token");
    if (!token) {
      return res.status(403).json("Not Authorized");
    }
    const payload = jwt.verify(token, process.env.jwtSecret); // Token obj w/ user uuid
    req.user = {
      id: payload.user
    };
    next();
  } catch (err) {
    console.log("Authorization Error!")
    console.log(err.message); // jwt malformed??
    return res.status(403).json("Not Authorized"); // Unauthorized
  }
};
