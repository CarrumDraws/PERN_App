require('dotenv').config();
const jwt = require("jsonwebtoken");

function jwtGenerator(user_id) {
    console.log("Server Generating JWT...");
    const payload = {
        user: user_id
    }
    return jwt.sign(payload, process.env.JWTSECRET, { expiresIn: "1hr" });
}

module.exports = jwtGenerator;