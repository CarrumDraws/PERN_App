require("dotenv").config();
const jwt = require("jsonwebtoken");

// Authenticates Token (Call before every route after Authentication)
module.exports = async (req, res, next) => {
  console.log("Server Authenticating...")
  try {
    const token = req.header("token");
    if (!token) {
      return res.status(403).json("Not Authorized");
    }
    const payload = jwt.verify(token, process.env.JWTSECRET); // Token obj w/ user uuid
    req.user = {
      id: payload.user
    };
    next();
  } catch (err) {
    console.log("Authorization Error!")
    return res.status(403).json("Not Authorized"); // Unauthorized
  }
};
